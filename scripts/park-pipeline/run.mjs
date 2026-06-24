// Park-request pipeline orchestrator.
//
//   draft → type-check gate → review loop → translate → type-check gate →
//   register in PARKS → full build + test + lint
//
// Each AI step runs through Cloudflare AI Gateway (see client.mjs). The
// deterministic gates (typecheck/build/test/lint) are the real safety net —
// the AI never decides whether the result compiles. This script only WRITES
// files; committing + opening the PR is the workflow's job.
//
// Inputs come from env: either the parsed issue-form fields (PARK_NAME etc.)
// or the raw issue body (ISSUE_BODY) which we parse here.

import { readFileSync, writeFileSync, appendFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ask, usage, MODEL } from './client.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DATA = join(ROOT, 'src', 'data');
const MAX_REVIEW_ROUNDS = 3;
const MAX_FIX_ATTEMPTS = 2;

// ---------- helpers ----------

const read = (p) => readFileSync(p, 'utf8');

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/national\s+(park|monument|preserve|recreation area|seashore|historic site)s?/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function camelCase(slug) {
  return slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

// Map GitHub issue-form markdown (### Label \n value) to a field object.
function parseIssueForm(body) {
  const out = {};
  const re = /^###\s+(.+?)\s*\n+([\s\S]*?)(?=\n###\s|$)/gm;
  let m;
  while ((m = re.exec(body))) {
    const value = m[2].trim();
    out[m[1].trim().toLowerCase()] = value === '_No response_' || value === 'No response' ? '' : value;
  }
  return out;
}

function field(form, ...needles) {
  const key = Object.keys(form).find((k) => needles.some((n) => k.includes(n)));
  return key ? form[key] : '';
}

function extractCode(text) {
  const blocks = [...text.matchAll(/```(?:ts|typescript)?\s*\n([\s\S]*?)```/g)];
  const body = blocks.length ? blocks[blocks.length - 1][1] : text;
  return body.trim() + '\n';
}

function extractJson(text) {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start >= 0 && end > start) {
    try {
      return JSON.parse(text.slice(start, end + 1));
    } catch {
      /* fall through */
    }
  }
  return null;
}

function gate(cmd) {
  try {
    execSync(cmd, { cwd: ROOT, stdio: 'pipe', encoding: 'utf8' });
    return { ok: true, out: '' };
  } catch (e) {
    return { ok: false, out: `${e.stdout || ''}\n${e.stderr || ''}`.trim() };
  }
}

function setOutput(key, value) {
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${value}\n`);
}

// ---------- resolve the request ----------

const issueBody = process.env.ISSUE_BODY || '';
const form = parseIssueForm(issueBody);

const parkName = (process.env.PARK_NAME || field(form, 'park name') || '').trim();
if (!parkName) throw new Error('No park name provided (set PARK_NAME or include a "Park name" field).');

const region = (process.env.PARK_REGION || field(form, 'region')).trim();
const decks = (process.env.PARK_DECKS || field(form, 'deck')).trim() || 'Places, Animals';
const notes = (process.env.PARK_NOTES || field(form, 'note')).trim();
const slug = slugify(process.env.PARK_SLUG || field(form, 'slug') || parkName);
const exportName = camelCase(slug);
const parkPath = join(DATA, 'parks', `${slug}.ts`);
const indexPath = join(DATA, 'index.ts');

if (existsSync(parkPath)) throw new Error(`Park file already exists: src/data/parks/${slug}.ts`);

console.log(`Park: ${parkName} → src/data/parks/${slug}.ts (export ${exportName}), model ${MODEL}`);

// ---------- shared context for the model ----------

const typesSrc = read(join(DATA, 'types.ts'));
const templateSrc = read(join(DATA, 'parks', '_TEMPLATE.ts'));
const promptSrc = existsSync(join(DATA, 'parks', '_PROMPT.md')) ? read(join(DATA, 'parks', '_PROMPT.md')) : '';
const exampleSrc = read(join(DATA, 'parks', 'yellowstone.ts'));

const CONTEXT = `You are extending a data-driven national-parks field-guide app. Park content lives entirely in one file per park; components never hardcode park data.

The Park TypeScript type (src/data/types.ts):
\`\`\`ts
${typesSrc}
\`\`\`

The canonical template to copy (src/data/parks/_TEMPLATE.ts):
\`\`\`ts
${templateSrc}
\`\`\`

Authoring guidance (_PROMPT.md):
${promptSrc}

A fully fact-checked reference park for tone, depth, and structure (src/data/parks/yellowstone.ts):
\`\`\`ts
${exampleSrc}
\`\`\`

Hard requirements:
- The file MUST export \`export const ${exportName}: Park = { ... }\` and \`import type { Park } from '../types';\`.
- \`slug\` must be exactly "${slug}".
- Each Subject.id is unique within this park, kebab-case. Each QuizQuestion.subjectId must match a Subject.id in the SAME deck. \`a\` is the 0-based index of the correct option.
- Every fact must be accurate and verifiable. Add a trailing \`// source: <authority>\` comment on each fact's line citing NPS, USGS, or a comparably authoritative source. Do not invent figures.
- Match the depth of the reference park: roughly 6-8 subjects per deck and a quiz bank covering them.`;

const FIX_SYS = 'You fix TypeScript so it conforms to the Park type and compiles under strict mode. Return only the corrected file in a single ```ts code block.';

// ---------- pipeline steps ----------

async function writeAndTypecheck(content, label) {
  writeFileSync(parkPath, content);
  let res = gate('npm run typecheck');
  let attempt = 0;
  while (!res.ok && attempt < MAX_FIX_ATTEMPTS) {
    attempt += 1;
    console.log(`  type-check failed (${label}); fix attempt ${attempt}`);
    const fixed = extractCode(
      await ask({
        system: FIX_SYS,
        user: `This file failed \`tsc\` type-checking. Fix it so it compiles under strict mode (noUnusedLocals/noUnusedParameters are on).\n\nErrors:\n${res.out}\n\nCurrent file:\n\`\`\`ts\n${content}\n\`\`\``,
      }),
    );
    content = fixed;
    writeFileSync(parkPath, content);
    res = gate('npm run typecheck');
  }
  if (!res.ok) throw new Error(`Type-check still failing after ${MAX_FIX_ATTEMPTS} fixes (${label}):\n${res.out}`);
  console.log(`  type-check passed (${label})`);
  return content;
}

async function draft() {
  console.log('Step 1: draft');
  const text = await ask({
    system: CONTEXT,
    user: `Write the complete file src/data/parks/${slug}.ts for **${parkName}**.
Region (hero eyebrow): ${region || '(choose an accurate "State · subregion" line)'}
Decks to include: ${decks}
${notes ? `Notes & required sources:\n${notes}\n` : ''}
Write English-only content for now (bare strings are fine; translation happens in a later step). Return only the file in a single \`\`\`ts code block.`,
  });
  return writeAndTypecheck(extractCode(text), 'draft');
}

async function review(content) {
  console.log('Step 2: review loop');
  const reviewNotes = [];
  for (let round = 1; round <= MAX_REVIEW_ROUNDS; round += 1) {
    const verdictText = await ask({
      system:
        'You are a meticulous fact-checker and TypeScript reviewer for a national-parks guide. Be skeptical: flag any fact that is wrong, unverifiable, or uncited, any wrong quiz answer index, any subjectId that does not match a subject in the same deck, and any schema problem. Respond with ONLY a JSON object: {"approved": boolean, "issues": ["..."]}.',
      user: `Review this park file for **${parkName}**. Approve only if every fact is accurate and cited and the schema is correct.\n\n\`\`\`ts\n${content}\n\`\`\``,
    });
    const verdict = extractJson(verdictText) || { approved: false, issues: ['Could not parse review output.'] };
    if (verdict.approved) {
      console.log(`  approved on round ${round}`);
      return { content, notes: reviewNotes };
    }
    const issues = (verdict.issues || []).slice(0, 30);
    console.log(`  round ${round}: ${issues.length} issue(s); revising`);
    reviewNotes.push(`Round ${round}: ${issues.join('; ')}`);
    if (round === MAX_REVIEW_ROUNDS) {
      reviewNotes.push('Reached max review rounds with issues still open — needs human review.');
      return { content, notes: reviewNotes, unresolved: true };
    }
    const revised = extractCode(
      await ask({
        system: CONTEXT,
        user: `Revise the park file to address every issue below. Keep everything that was correct.\n\nIssues:\n${issues.map((i) => `- ${i}`).join('\n')}\n\nCurrent file:\n\`\`\`ts\n${content}\n\`\`\`\nReturn the full corrected file in one \`\`\`ts block.`,
      }),
    );
    content = await writeAndTypecheck(revised, `review round ${round}`);
  }
  return { content, notes: reviewNotes };
}

async function translate(content) {
  console.log('Step 3: translate (es)');
  const text = await ask({
    system:
      'You add neutral Latin-American Spanish translations to a national-parks data file. Convert every user-facing LocalizedString (name, region, coord, colorName, teaser, fact tag/text, deck label, tagline, safetyNote, and quiz q/opts/why) from a bare string to an { en, es } object. Do NOT translate or change ids, slugs, hex colors, the numeric answer index, or source comments. Keep all facts identical in meaning.',
    user: `Add Spanish translations to this file. Return the full file in one \`\`\`ts block.\n\n\`\`\`ts\n${content}\n\`\`\``,
  });
  return writeAndTypecheck(extractCode(text), 'translate');
}

function register() {
  console.log('Step 4: register in PARKS');
  let idx = read(indexPath);
  const importLine = `import { ${exportName} } from './parks/${slug}';`;
  if (!idx.includes(importLine)) {
    const lines = idx.split('\n');
    let last = -1;
    lines.forEach((l, i) => {
      if (/from '\.\/parks\//.test(l)) last = i;
    });
    lines.splice(last + 1, 0, importLine);
    idx = lines.join('\n');
  }
  idx = idx.replace(/(export const PARKS:\s*Park\[\]\s*=\s*\[)([^\]]*)\]/, (_m, open, inner) => {
    const items = inner.split(',').map((s) => s.trim()).filter(Boolean);
    if (!items.includes(exportName)) items.push(exportName);
    return `${open}${items.join(', ')}]`;
  });
  writeFileSync(indexPath, idx);
}

// ---------- run ----------

const drafted = await draft();
const reviewed = await review(drafted);
const translated = await translate(reviewed.content);
register();

console.log('Step 5: full build + test + lint');
for (const cmd of ['npm run build', 'npm test', 'npm run lint']) {
  const res = gate(cmd);
  if (!res.ok) throw new Error(`Final gate failed: ${cmd}\n${res.out}`);
  console.log(`  ${cmd} passed`);
}

const { inputTokens, outputTokens } = usage();
const cost = (inputTokens / 1e6) * 5 + (outputTokens / 1e6) * 25; // Opus 4.8 $5/$25 per MTok

const summary = `## 🏞️ Generated park: ${parkName}

- **File:** \`src/data/parks/${slug}.ts\` (export \`${exportName}\`)
- **Route:** \`/${slug}\`
- **Model:** \`${MODEL}\` via Cloudflare AI Gateway
- **Tokens:** ${inputTokens.toLocaleString()} in / ${outputTokens.toLocaleString()} out (~$${cost.toFixed(2)})
- **Gates:** type-check, build, test, lint all passed
${reviewed.unresolved ? '\n> ⚠️ **Automated review left issues open — verify facts carefully before merging.**' : ''}
${reviewed.notes.length ? `\n<details><summary>Review notes</summary>\n\n${reviewed.notes.map((n) => `- ${n}`).join('\n')}\n</details>` : ''}

> ⚠️ AI-generated. **Verify every fact and source before merging.**`;

writeFileSync(join(ROOT, 'pipeline-summary.md'), summary);
setOutput('slug', slug);
setOutput('park_name', parkName);
setOutput('unresolved', reviewed.unresolved ? 'true' : 'false');
console.log('Done.');
