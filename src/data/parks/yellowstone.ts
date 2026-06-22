import type { Park, Subject, QuizQuestion } from '../types';

// Places deck — ported from the prototype's DATA array.
// Accents are the literal hex values the prototype's :root defined per token,
// inlined here so the park file is fully self-contained.
const places: Subject[] = [
  {
    id: 'grand-prismatic', name: 'Grand Prismatic Spring', region: 'Midway Geyser Basin',
    coord: '44.525°N · 110.838°W', accent: '#3F8FD0', colorName: 'Cobalt',
    teaser: "The biggest hot spring in the U.S. — a rainbow painted by heat-loving microbes.",
    facts: [
      { tag: 'Wow', text: "It's the largest hot spring in the United States and the third largest on Earth — only Frying Pan Lake (New Zealand) and Boiling Lake (Dominica) are bigger." },
      { tag: 'Scale', text: "About 370 feet across — longer than an American football field — and roughly 121 feet deep, deeper than a 10-story building." },
      { tag: 'Geology', text: "Those rainbow rings are living thermophile mats. Each band is a different temperature zone, so each hosts a different microbe with a different color." },
      { tag: 'Geology', text: "The deep-blue center is too hot for anything to live in — that blue is just very deep, very clear water. The rim shifts orange-red in summer and dark green in winter." },
      { tag: 'Numbers', text: "It pours about 560 gallons of ~160°F water into the Firehole River every minute." },
      { tag: 'History', text: "Named by the 1871 Hayden Survey for its prism-like colors. Fur trappers had described a 'boiling lake' here back in 1839." },
      { tag: 'Science', text: "Yellowstone's heat-loving microbes gave us the Taq enzyme behind PCR testing — the foundation of DNA sequencing, the Human Genome Project, and COVID tests." },
      { tag: 'Tip', text: "The view that makes the postcards is from the overlook off the Fairy Falls trail — which wasn't even an official viewpoint until 2017." },
    ],
  },
  {
    id: 'old-faithful', name: 'Old Faithful', region: 'Upper Geyser Basin',
    coord: '44.460°N · 110.828°W', accent: '#E3A33C', colorName: 'Amber',
    teaser: "Not the tallest or biggest geyser — just the most dependable, and the first ever named.",
    facts: [
      { tag: 'History', text: "The first geyser in the park to get a name — christened in 1870 by the Washburn expedition." },
      { tag: 'Myth', text: "It does NOT erupt 'on the hour.' Intervals run roughly 35 minutes to 2 hours, averaging about 90 minutes today." },
      { tag: 'How', text: "Rangers predict it from the LAST eruption: the longer an eruption lasts, the longer the wait until the next one. They nail it ~90% of the time within 10 minutes." },
      { tag: 'Numbers', text: "Each eruption lasts 1.5–5 minutes, throws 3,700–8,400 gallons of boiling water, and reaches 106–185 feet (about 130–140 on average)." },
      { tag: 'Wow', text: "More than 1 million eruptions have been recorded since Yellowstone became a park in 1872." },
      { tag: 'Geology', text: "It's so reliable because its plumbing is isolated — unlike most features here, it doesn't share water with its neighbors." },
      { tag: 'Geology', text: "Big earthquakes (1959 Hebgen Lake, 1983 Borah Peak) lengthened its intervals — even rainfall nudges its timing." },
      { tag: 'Oddity', text: "In the 1880s soldiers used it as a laundry. Cotton and linen came out clean; wool got torn to shreds." },
    ],
  },
  {
    id: 'norris', name: 'Norris Geyser Basin', region: 'Home of Steamboat Geyser',
    coord: '44.726°N · 110.703°W', accent: '#BFCE52', colorName: 'Sulphur lime',
    teaser: "The park's hottest, most acidic, most restless basin — and the world's tallest geyser.",
    facts: [
      { tag: 'Record', text: "Steamboat Geyser is the tallest active geyser on Earth — major eruptions blast water 300–400 feet up, roughly twice Old Faithful's height." },
      { tag: 'Unpredictable', text: "Steamboat is wildly erratic: gaps between major eruptions range from a few days to 50 years. It went nearly dormant, then roared back in 2018." },
      { tag: 'Wow', text: "In its 2019 and 2020 active streaks it erupted 48 times each year — a record. After a major blast it can vent steam for up to 48 hours." },
      { tag: 'Heat', text: "Norris is the hottest place in the park — an underground temperature of 280°F (138°C) has been measured here." },
      { tag: 'Geology', text: "It sits on the intersection of three faults and is one of Yellowstone's most earthquake-prone spots. New features appear and vanish within hours." },
      { tag: 'Geology', text: "Most of Yellowstone's springs are alkaline, but Norris runs acidic too — Echinus Geyser's water is about as sour as vinegar." },
      { tag: 'Safety', text: "Stand clear: Steamboat's mineral-laden spray can etch car paint and windows in the parking lot." },
    ],
  },
  {
    id: 'mammoth', name: 'Mammoth Hot Springs', region: 'North entrance · near Gardiner',
    coord: '44.969°N · 110.703°W', accent: '#D9C6A2', colorName: 'Travertine',
    teaser: "A terraced 'cave turned inside out,' built from limestone and rebuilt almost daily.",
    facts: [
      { tag: 'Geology', text: "The terraces are travertine — limestone that dissolves underground, rides up with the hot water, then crystallizes as the water releases CO₂ at the surface." },
      { tag: 'Numbers', text: "More than two tons of dissolved calcium carbonate flow into Mammoth every single day." },
      { tag: 'Surprise', text: "Mammoth sits OUTSIDE the Yellowstone caldera. Its rock is limestone, not the rhyolite of the geyser basins — which is why there are no geysers here." },
      { tag: 'Geology', text: "Its hot water travels underground all the way from Norris along a fault, cooling to about 170°F by the time it surfaces." },
      { tag: 'Living', text: "It changes constantly — active terraces can grow half an inch a day. Springs run dry while brand-new ones break out nearby." },
      { tag: 'History', text: "Shoshone and Bannock people gathered minerals here for white paint for centuries." },
      { tag: 'Landmark', text: "Liberty Cap, a 37-foot dormant hot-spring cone, was named in 1871 for the peaked caps of the French Revolution." },
    ],
  },
  {
    id: 'grand-canyon', name: 'Grand Canyon of the Yellowstone', region: 'Canyon · Artist Point',
    coord: '44.721°N · 110.480°W', accent: '#CB5C39', colorName: 'Rust',
    teaser: "A 1,000-foot gorge of yellow rock and a waterfall nearly twice the height of Niagara.",
    facts: [
      { tag: 'Scale', text: "Roughly 20 miles long, over 1,000 feet deep, and 1,500–4,000 feet wide." },
      { tag: 'Waterfall', text: "The Lower Falls drop 308 feet — nearly twice the height of Niagara. The Upper Falls drop 109 feet." },
      { tag: 'Numbers', text: "Depending on the season, 5,000 to 60,000 gallons of water pour over the Lower Falls every second." },
      { tag: 'Geology', text: "The canyon's yellow, orange and pink walls are rhyolite chemically 'cooked' and stained by ancient hydrothermal activity — likely the source of the river's and park's name." },
      { tag: 'Geology', text: "The Yellowstone River carved it by eroding rock that hot water and steam had already weakened — and it's still cutting deeper today." },
      { tag: 'History', text: "Artist Point is one of the most photographed views in the park — but it's misnamed. Thomas Moran actually sketched the canyon from the north rim, not here." },
    ],
  },
  {
    id: 'lamar', name: 'Lamar Valley', region: "Northern Range · the 'Serengeti'",
    coord: '44.898°N · 110.222°W', accent: '#74A85E', colorName: 'Sage',
    teaser: "The 'Serengeti of North America' — and the best place on Earth to watch wild wolves.",
    facts: [
      { tag: 'Wildlife', text: "Often called the Serengeti of North America for its open meadows packed with bison, elk, pronghorn, bears, and wolves." },
      { tag: 'Wolves', text: "Wolves were wiped out of Yellowstone by the 1920s, then reintroduced in 1995–96. Lamar is now the premier wolf-watching spot in the world." },
      { tag: 'Ecology', text: "Their return rebalanced everything — elk stopped overgrazing, willows and beavers came back, songbirds returned. It's a textbook trophic cascade." },
      { tag: 'Tip', text: "Go at dawn or dusk; winter is best for wolves, since dark coats stand out against snow. Bring binoculars or a spotting scope — animals are often far off." },
      { tag: 'Spring', text: "Watch for red-coated bison calves ('red dogs') in late spring and early summer." },
      { tag: 'Geology', text: "The valley was carved by ancient glaciers; the Lamar River winds through its floor. Bison ranching continued here until the 1950s." },
      { tag: 'Safety', text: "Keep at least 100 yards from wolves and bears, and 25 yards from bison and elk — every year people are gored getting too close." },
    ],
  },
  {
    id: 'hayden', name: 'Hayden Valley', region: 'Central · along the Yellowstone River',
    coord: '44.660°N · 110.468°W', accent: '#2FA294', colorName: 'Teal',
    teaser: "The park's central wildlife theater — a former lakebed thick with summer bison.",
    facts: [
      { tag: 'Wildlife', text: "Hayden is the central counterpart to Lamar — superb for huge bison herds, grizzlies, and birds along the Yellowstone River." },
      { tag: 'Wolves', text: "It's the territory of the Wapiti Lake wolf pack, making it a strong second spot for wolf sightings after Lamar." },
      { tag: 'Geology', text: "It's a former lakebed. Fine glacial lake sediments make poor soil for trees, so it stays open grassland — which is exactly why wildlife is so easy to spot." },
      { tag: 'Summer', text: "August is bison rut: expect big, noisy, dust-rolling herds — and traffic jams as they cross the road on their own schedule." },
      { tag: 'Tip', text: "Use the pullouts, never stop in the lane, and stay in your car when bison are close. They look slow but can outrun you." },
    ],
  },
  {
    id: 'caldera', name: 'The Yellowstone Caldera', region: 'Parkwide · the supervolcano',
    coord: '~30 × 45 miles across', accent: '#A074C8', colorName: 'Magma violet',
    teaser: "You're standing inside a supervolcano that holds half the world's geysers.",
    facts: [
      { tag: 'Big', text: "Yellowstone is a supervolcano. Its last major caldera-forming eruption ~640,000 years ago left a crater about 30 by 45 miles wide — you drive across it without noticing." },
      { tag: 'Heat', text: "Molten rock may sit as little as 3–8 miles beneath your feet. That heat drives every geyser, spring, and mudpot in the park." },
      { tag: 'Wow', text: "About half of all the geysers on Earth are here — roughly 500 of the world's ~1,000. Only Kamchatka, Chile, New Zealand, and Iceland come close." },
      { tag: 'Restless', text: "The park records more than 1,000 earthquakes a year, most too small to feel." },
      { tag: 'Science', text: "A microbe found in a Yellowstone hot spring in 1968 yielded the Taq enzyme — the breakthrough that made PCR, genome sequencing, and rapid COVID tests possible." },
      { tag: 'History', text: "In 1872 Yellowstone became the first national park in the world. People have lived and traveled here for over 11,000 years." },
      { tag: 'Scale', text: "It spans Wyoming, Montana, and Idaho across about 3,468 square miles and draws millions of visitors a year." },
    ],
  },
];

// Animals deck — ported from the prototype's ANIMALS array.
const animals: Subject[] = [
  {
    id: 'a-bison', name: 'American Bison', region: 'Park icon · our national mammal',
    coord: 'Bulls to 2,000 lb · 35 mph', accent: '#8C5A3B', colorName: 'Icon',
    teaser: "North America's largest land mammal — and the only place they've roamed wild without a break.",
    facts: [
      { tag: 'Wow', text: "Yellowstone is the only place in the U.S. where wild bison have lived continuously since prehistoric times." },
      { tag: 'Scale', text: "They're the largest land mammal in North America — bulls reach about 2,000 lb and 6 feet at the shoulder; cows around 1,000 lb." },
      { tag: 'Speed', text: "Don't let the bulk fool you: bison sprint up to 35 mph — three times faster than you — and can jump 6 feet." },
      { tag: 'Comeback', text: "By the late 1800s, hunting cut North America's ~30 million bison to under a thousand, with just two dozen wild ones left in Yellowstone. Today the park herd is the largest on public land, around 5,000." },
      { tag: 'Calves', text: "Newborns are nicknamed 'red dogs' for their orange-red coats in spring and early summer." },
      { tag: 'Tip', text: "Read the tail: hanging and swishing means calm; standing straight up means it may charge. Stay back at least 25 yards." },
      { tag: 'Name', text: "They're bison, not buffalo. True buffalo live in Africa and Asia — early settlers just borrowed the name." },
      { tag: 'Where', text: "The biggest summer herds gather in Lamar and Hayden Valleys; the thunderous rut peaks in late July and August." },
    ],
  },
  {
    id: 'a-wolf', name: 'Gray Wolf', region: 'Apex predator · reintroduced 1995',
    coord: '66–110 lb · packs of ~10', accent: '#9AA0A6', colorName: 'Apex predator',
    teaser: "Wiped out, then brought back — and the whole ecosystem changed with them.",
    facts: [
      { tag: 'History', text: "Wolves were exterminated from Yellowstone by the 1920s and reintroduced in 1995–96 — one of conservation's great success stories." },
      { tag: 'Ecology', text: "Their return set off a trophic cascade: elk stopped overgrazing, willows and beavers recovered, and even riverbanks stabilized." },
      { tag: 'Pack', text: "Wolves live and hunt in family packs led by a breeding pair, using teamwork to bring down elk far larger than themselves." },
      { tag: 'Numbers', text: "Around 100 wolves in roughly 8–10 packs roam the park. Lamar Valley is the best place on Earth to watch them." },
      { tag: 'Voice', text: "A wolf's howl carries for miles — it's how packs reunite, mark territory, and warn off rivals." },
      { tag: 'Tip', text: "Dawn, dusk, and winter are prime — dark coats stand out against snow. Bring a spotting scope; sightings are usually distant." },
    ],
  },
  {
    id: 'a-grizzly', name: 'Grizzly Bear', region: "Greater Yellowstone's giant",
    coord: '300–700 lb · claws to 4 in', accent: '#C5873C', colorName: 'Omnivore',
    teaser: "A shoulder hump of pure digging muscle — and one of the last strongholds in the Lower 48.",
    facts: [
      { tag: 'Range', text: "In the contiguous U.S., grizzlies survive almost only in and around Yellowstone — about 150 in the park and over 1,000 across the Greater Yellowstone Ecosystem." },
      { tag: 'Anatomy', text: "That shoulder hump is solid muscle that powers their digging, and their claws reach up to 4 inches. A 'dish-shaped' face tells them apart from black bears." },
      { tag: 'Hyperphagia', text: "Before winter they binge in a frenzy called hyperphagia — packing on fat at up to ~20,000 calories a day." },
      { tag: 'Hibernation', text: "They den from roughly November to March. A pregnant female's embryo won't even implant unless she's stored enough fat to survive the winter." },
      { tag: 'Cubs', text: "Cubs are born mid-winter in the den — blind, nearly hairless, and only about a pound. They stay with mom for 2–3 years." },
      { tag: 'Comeback', text: "Listed as threatened in 1975 when only ~136 remained in the ecosystem; decades of protection rebuilt the population." },
      { tag: 'Safety', text: "Keep at least 100 yards away and carry bear spray. Never run — you can't outrun one." },
    ],
  },
  {
    id: 'a-elk', name: 'Elk (Wapiti)', region: "The park's most abundant big mammal",
    coord: 'Bulls to 700 lb · bugle in fall', accent: '#A8543A', colorName: 'Most abundant',
    teaser: "The sound of a Yellowstone autumn — a bull's eerie bugle ringing across the valley.",
    facts: [
      { tag: 'Numbers', text: "Elk are the most abundant large mammal in Yellowstone; summer herds across the park number in the tens of thousands." },
      { tag: 'Bugle', text: "In the fall rut, bulls 'bugle' — a haunting high whistle dropping into deep grunts — to challenge rivals and gather harems of cows." },
      { tag: 'Antlers', text: "Bulls grow a brand-new set of antlers every year, sometimes 4 feet wide, then shed them each spring." },
      { tag: 'Food web', text: "Elk are the backbone of the predator menu — the main prey for wolves and a key food source for bears and cougars." },
      { tag: 'Where', text: "Commonly seen around Mammoth (often right on the lawns), Madison, and the northern valleys; they drop to lower ground in winter." },
      { tag: 'Safety', text: "Rutting bulls in fall and cows with calves in spring are genuinely dangerous — give them a wide berth, especially around Mammoth." },
    ],
  },
  {
    id: 'a-pronghorn', name: 'Pronghorn', region: 'Fastest animal in North America',
    coord: '~60 mph · eyesight like 8× binoculars', accent: '#D8B45A', colorName: 'Fastest',
    teaser: "Built to outrun a predator that's been extinct for 12,000 years.",
    facts: [
      { tag: 'Speed', text: "The fastest land animal in North America — clocked near 60 mph, and able to hold a fast pace far longer than a cheetah." },
      { tag: 'Evolution', text: "It evolved that speed to escape the American cheetah, extinct for ~12,000 years — so today it outruns predators that no longer exist." },
      { tag: 'Eyes', text: "Its huge eyes give vision roughly like 8× binoculars, spotting movement miles away across open ground." },
      { tag: 'Not antelope', text: "Despite the nickname 'pronghorn antelope,' it isn't a true antelope — it's the sole survivor of its own ancient family." },
      { tag: 'Horns', text: "Both sexes grow pronged horns with a keratin sheath that's shed and regrown each year — unusual among horned animals." },
      { tag: 'Yellowstone', text: "The park's small herd crashed to about 190 animals in 2009 but has since rebounded; look for them in the dry northern range." },
    ],
  },
  {
    id: 'a-moose', name: 'Moose', region: "The park's elusive giant",
    coord: 'Largest deer · bulls 1,000+ lb', accent: '#707C4C', colorName: 'Largest deer',
    teaser: "The biggest member of the deer family — and one of Yellowstone's hardest to find.",
    facts: [
      { tag: 'Size', text: "Moose are the largest members of the deer family; a big bull can top 1,000 pounds and stand 6 feet at the shoulder." },
      { tag: 'Antlers', text: "Bulls grow broad, flat 'palmate' antlers — shaped like open hands — and shed them each winter." },
      { tag: 'Habitat', text: "They browse willows and aquatic plants, so look near wetlands, rivers, and lakes rather than open grassland." },
      { tag: 'Elusive', text: "Once more common, moose are now one of the park's most elusive large mammals — a genuinely lucky sighting." },
      { tag: 'Solitary', text: "Unlike elk and bison, moose are usually loners rather than herd animals." },
      { tag: 'Safety', text: "Don't be fooled by the slow look — moose are powerful and can be aggressive, especially cows with calves." },
    ],
  },
  {
    id: 'a-coyote', name: 'Coyote', region: 'The clever survivor',
    coord: '~25–35 lb · often mistaken for a wolf', accent: '#C8A878', colorName: 'Survivor',
    teaser: "Smaller, lighter, and everywhere — the wolf's wily cousin.",
    facts: [
      { tag: 'ID', text: "Often mistaken for wolves, coyotes are much smaller (~25–35 lb versus a wolf's 100+), with a narrow snout, big ears, and a slender build." },
      { tag: "Wolves' effect", text: "When wolves returned, coyote numbers fell sharply in wolf territory — the survivors learned to keep their distance." },
      { tag: 'Diet', text: "Opportunists that eat rodents, rabbits, insects, carrion, and berries — they hunt mice with a high, pouncing leap." },
      { tag: 'Voice', text: "Their yips, barks, and howls are a classic Yellowstone night sound, often heard as a whole chorus." },
      { tag: 'Where', text: "One of the most visible predators in the park — frequently seen hunting across meadows in broad daylight." },
    ],
  },
  {
    id: 'a-eagle', name: 'Bald Eagle', region: 'National bird · conservation comeback',
    coord: '~6–7 ft wingspan · fish hunter', accent: '#6E8AA8', colorName: 'Comeback',
    teaser: "Once nearly gone from the country — now nesting over Yellowstone's lakes and rivers.",
    facts: [
      { tag: 'Comeback', text: "The bald eagle is a national conservation success story, recovering from near-collapse to nest across the park again." },
      { tag: 'Where', text: "Look near water — the Yellowstone River, Yellowstone Lake, and the Madison — where they hunt fish and waterfowl." },
      { tag: 'Size', text: "Wingspans reach about 6–7 feet, and they build some of the largest tree nests of any North American bird, reused and enlarged for years." },
      { tag: 'Not bald', text: "'Bald' comes from an old word for white-headed — the white head and tail only appear at about 4–5 years old." },
      { tag: 'Pirate', text: "They'll happily steal a meal, harassing ospreys and other birds until they drop their catch." },
    ],
  },
];

// Places quiz bank — ported from the prototype's QUIZ array (loc -> subjectId).
const placesQuiz: QuizQuestion[] = [
  { subjectId: 'grand-prismatic', q: "Where does Grand Prismatic rank among the world's hot springs?", opts: ["The single largest on Earth", "Third largest in the world (largest in the U.S.)", "The deepest ever measured", "Tenth largest in North America"], a: 1, why: "It's the largest hot spring in the U.S. and third largest on Earth, behind Frying Pan Lake (New Zealand) and Boiling Lake (Dominica)." },
  { subjectId: 'grand-prismatic', q: "What gives Grand Prismatic its rainbow rings?", opts: ["Dissolved copper and iron dyes", "Sunlight refracting through steam", "Heat-loving microbes living at different temperatures", "Seasonal algae that only bloom in July"], a: 2, why: "Each colored band is a different temperature zone, and each zone hosts a different thermophile microbe — so the rings map heat." },
  { subjectId: 'grand-prismatic', q: "Why is the very center of the spring deep blue?", opts: ["It reflects the sky", "It's too hot for life — it's just deep, clear water", "Blue-pigmented bacteria thrive there", "Copper minerals stain it"], a: 1, why: "The center is near boiling, too hot for microbes. With nothing living in it, you see deep, clear water — which is naturally blue." },

  { subjectId: 'old-faithful', q: "What's true about Old Faithful's schedule?", opts: ["It erupts exactly every 60 minutes", "It has never erupted 'on the hour' — intervals average ~90 min", "It only erupts twice a day", "It erupts every 30 minutes in summer"], a: 1, why: "Despite the legend, it never ran hourly. Intervals range from about 35 minutes to 2 hours, averaging roughly 90 minutes today." },
  { subjectId: 'old-faithful', q: "Why is Old Faithful so predictable?", opts: ["It's the largest geyser in the park", "Its plumbing is isolated from other features", "A computer controls its valve", "Rangers refill it between eruptions"], a: 1, why: "Unlike most features in the basin, its plumbing doesn't share water with neighbors — so it builds and releases pressure on its own steady schedule." },
  { subjectId: 'old-faithful', q: "How did soldiers use Old Faithful in the 1880s?", opts: ["As a drinking fountain", "As a laundry", "As a heated bath", "To cook fish"], a: 1, why: "They used it as a laundry — cotton and linen came out clean, but wool was torn to shreds." },

  { subjectId: 'norris', q: "What record does Steamboat Geyser hold?", opts: ["Most frequent geyser on Earth", "Hottest water of any geyser", "Tallest active geyser in the world", "Oldest geyser in Yellowstone"], a: 2, why: "Steamboat is the tallest active geyser on the planet — its major eruptions roughly double the height of Old Faithful." },
  { subjectId: 'norris', q: "How high can a major Steamboat eruption reach?", opts: ["50–100 feet", "150–200 feet", "300–400 feet", "Over 1,000 feet"], a: 2, why: "Major eruptions blast water 300–400 feet into the air. Afterward it can vent steam for up to 48 hours." },
  { subjectId: 'norris', q: "Among Yellowstone's basins, Norris is the...", opts: ["Coldest and calmest", "Hottest and most acidic", "Most alkaline only", "Largest by surface area"], a: 1, why: "Norris is the park's hottest and most acidic basin — an underground temperature of 280°F has been recorded there." },

  { subjectId: 'mammoth', q: "What are the Mammoth terraces made of?", opts: ["Silica (geyserite)", "Travertine (a form of limestone)", "Obsidian", "Pure sulfur"], a: 1, why: "They're travertine — limestone that dissolves underground, rides up with the hot water, and crystallizes as the water releases CO₂ at the surface." },
  { subjectId: 'mammoth', q: "Why are there no geysers at Mammoth?", opts: ["It's too windy", "Cooler water, limestone rock, and it sits outside the caldera", "There's no magma anywhere near it", "The elevation is too high"], a: 1, why: "Mammoth's water surfaces around 170°F through limestone, outside the caldera — quite different from the scorching rhyolite geyser basins." },
  { subjectId: 'mammoth', q: "How fast can the most active terraces grow?", opts: ["About an inch per year", "Up to half an inch per day", "A full foot per day", "They no longer grow at all"], a: 1, why: "Active zones can grow up to half an inch a day — springs run dry while brand-new ones break out nearby, changing the landscape constantly." },

  { subjectId: 'grand-canyon', q: "How do the Lower Falls compare to Niagara Falls?", opts: ["About half as tall", "Roughly equal", "Nearly twice as tall", "Ten times as tall"], a: 2, why: "The Lower Falls drop 308 feet — nearly twice the height of Niagara." },
  { subjectId: 'grand-canyon', q: "What colors the canyon's yellow and orange walls?", opts: ["Lichen and moss", "Rhyolite chemically altered and iron-stained by hot water", "Copper ore deposits", "A layer of volcanic ash"], a: 1, why: "Ancient hydrothermal activity 'cooked' and stained the rhyolite — likely the source of the river's and the park's name." },
  { subjectId: 'grand-canyon', q: "Why is 'Artist Point' considered misnamed?", opts: ["No artist ever painted the canyon", "Thomas Moran actually sketched from the north rim", "It faces away from the falls", "It was named after a sculptor"], a: 1, why: "It was named in 1883 on the belief Thomas Moran sketched there — but he actually worked from the north rim. The name stuck anyway." },

  { subjectId: 'lamar', q: "When were wolves reintroduced to Yellowstone?", opts: ["1872", "The 1950s", "1995–96", "2010"], a: 2, why: "Wolves were wiped out by the 1920s and reintroduced in 1995–96. Lamar is now the premier place on Earth to watch wild wolves." },
  { subjectId: 'lamar', q: "What is Lamar Valley's famous nickname?", opts: ["The Valley of Geysers", "The Serengeti of North America", "The Grand Canyon of the North", "Wolf Town"], a: 1, why: "Its open meadows packed with bison, elk, pronghorn, bears and wolves earned it the 'Serengeti of North America' name." },
  { subjectId: 'lamar', q: "What did the wolves' return set off ecologically?", opts: ["A boom in the elk population", "A trophic cascade that rebalanced the ecosystem", "The loss of all bison", "No measurable change"], a: 1, why: "It's a textbook trophic cascade: elk stopped overgrazing, willows and beavers returned, and songbirds came back." },

  { subjectId: 'hayden', q: "Why is Hayden Valley open grassland instead of forest?", opts: ["Frequent wildfires", "It's a former lakebed with soil too poor for trees", "It's too cold for trees", "It was logged a century ago"], a: 1, why: "Fine glacial lake sediments make poor soil for trees, so it stays open — which is exactly why wildlife is so easy to spot here." },
  { subjectId: 'hayden', q: "Which wolf pack is most associated with Hayden Valley?", opts: ["The Junction Butte pack", "The Wapiti Lake pack", "The Druid pack", "The Lamar Canyon pack"], a: 1, why: "Hayden is the Wapiti Lake pack's territory, making it a strong second spot for wolf sightings after Lamar." },
  { subjectId: 'hayden', q: "What happens in Hayden Valley each August?", opts: ["Bears begin hibernating", "The bison rut — big, noisy, dust-rolling herds", "Wolf pups are born", "Elk migrate out entirely"], a: 1, why: "August is bison rut: expect large, loud herds and the occasional traffic jam as they cross the road on their own schedule." },

  { subjectId: 'caldera', q: "When was Yellowstone's last major caldera-forming eruption?", opts: ["About 6,000 years ago", "About 64,000 years ago", "About 640,000 years ago", "About 6 million years ago"], a: 2, why: "Roughly 640,000 years ago — it left a crater about 30 by 45 miles wide that you drive across without noticing." },
  { subjectId: 'caldera', q: "Roughly what share of the world's geysers are in Yellowstone?", opts: ["About 10%", "About a quarter", "About half", "Nearly all of them"], a: 2, why: "About half — roughly 500 of the world's ~1,000 geysers. Only Kamchatka, Chile, New Zealand and Iceland come close." },
  { subjectId: 'caldera', q: "A microbe found in Yellowstone enabled which technology?", opts: ["MRI scanners", "PCR testing", "The polio vaccine", "Solar panels"], a: 1, why: "A heat-loving microbe found here in 1968 yielded the Taq enzyme behind PCR — key to DNA sequencing, the Human Genome Project, and COVID tests." },
  { subjectId: 'caldera', q: "Yellowstone became the world's first national park in what year?", opts: ["1776", "1872", "1903", "1916"], a: 1, why: "1872 — the first national park anywhere in the world. People have traveled and lived in the area for over 11,000 years." },
];

// Animals quiz bank — ported from the prototype's ANIMAL_QUIZ array.
const animalsQuiz: QuizQuestion[] = [
  { subjectId: 'a-bison', q: "What makes Yellowstone's bison special?", opts: ["They were imported from Asia", "It's the only U.S. spot where wild bison have lived continuously since prehistoric times", "They're the only bison left on Earth", "They're the smallest bison subspecies"], a: 1, why: "Yellowstone is the only place in the U.S. where wild bison have lived continuously since prehistoric times — direct descendants of the original herds." },
  { subjectId: 'a-bison', q: "A baby bison is nicknamed a...", opts: ["Snowball", "Red dog", "Calfkin", "Buffalo pup"], a: 1, why: "Newborns are called 'red dogs' for their orange-red coats in spring and early summer." },
  { subjectId: 'a-bison', q: "How fast can a bison sprint?", opts: ["About 10 mph", "About 35 mph", "About 55 mph", "They can't run"], a: 1, why: "Despite weighing up to a ton, bison hit about 35 mph — roughly three times your top speed — and can jump 6 feet." },

  { subjectId: 'a-wolf', q: "When were wolves brought back to Yellowstone?", opts: ["1872", "The 1950s", "1995–96", "2010"], a: 2, why: "Wolves were wiped out by the 1920s and reintroduced in 1995–96, one of conservation's landmark successes." },
  { subjectId: 'a-wolf', q: "The wolves' return is the classic example of a...", opts: ["Invasive species problem", "Trophic cascade", "Population crash", "Migration"], a: 1, why: "It's a textbook trophic cascade — elk behavior changed, vegetation and beavers recovered, and the whole system rebalanced." },
  { subjectId: 'a-wolf', q: "What is a Yellowstone wolf pack's main prey?", opts: ["Fish", "Elk", "Berries", "Bald eagles"], a: 1, why: "Packs use teamwork to hunt elk, often animals far larger than a single wolf." },

  { subjectId: 'a-grizzly', q: "What is a grizzly's shoulder hump made of?", opts: ["Stored fat", "Solid digging muscle", "A water pouch", "Loose skin"], a: 1, why: "The hump is solid muscle that powers their digging — paired with claws up to 4 inches long." },
  { subjectId: 'a-grizzly', q: "During pre-winter 'hyperphagia,' a grizzly may eat up to...", opts: ["2,000 calories a day", "20,000 calories a day", "200 calories a day", "It stops eating"], a: 1, why: "In hyperphagia they binge to build fat reserves — up to roughly 20,000 calories a day." },
  { subjectId: 'a-grizzly', q: "In the Lower 48, grizzlies survive almost only...", opts: ["In Florida swamps", "In and around Yellowstone", "In the Appalachians", "Nowhere — they're extinct"], a: 1, why: "They cling on mainly in the Greater Yellowstone Ecosystem and parts of Montana and Idaho — about 150 live in the park itself." },

  { subjectId: 'a-elk', q: "The eerie fall mating call of a bull elk is called a...", opts: ["Bellow", "Bugle", "Bray", "Purr"], a: 1, why: "Bulls 'bugle' during the autumn rut — a high whistle that drops into deep grunts — to challenge rivals and gather cows." },
  { subjectId: 'a-elk', q: "Among Yellowstone's large mammals, elk are...", opts: ["The rarest", "The most abundant", "Only seen in winter", "Not found in the park"], a: 1, why: "Elk are the most abundant large mammal in the park — and the backbone of the predator food web." },
  { subjectId: 'a-elk', q: "What happens to a bull elk's antlers each year?", opts: ["They're permanent", "They're grown fresh and shed every year", "They never fall off", "They're actually horns"], a: 1, why: "Bulls grow a complete new set of antlers annually — sometimes 4 feet wide — then shed them in spring." },

  { subjectId: 'a-pronghorn', q: "The pronghorn is North America's...", opts: ["Largest land mammal", "Fastest land animal", "Only marsupial", "Slowest grazer"], a: 1, why: "It's the fastest land animal on the continent, clocked near 60 mph and able to sustain speed far longer than a cheetah." },
  { subjectId: 'a-pronghorn', q: "Pronghorn evolved their blazing speed to escape...", opts: ["Wolves", "The American cheetah, now extinct", "Humans", "Eagles"], a: 1, why: "They outran the American cheetah, extinct for ~12,000 years — so they're now faster than anything that hunts them." },
  { subjectId: 'a-pronghorn', q: "Is the pronghorn a true antelope?", opts: ["Yes", "No — it's the sole survivor of its own family", "Yes, an African species", "No, it's a deer"], a: 1, why: "Despite the 'antelope' nickname, it's the last living member of its own ancient North American family." },

  { subjectId: 'a-moose', q: "The moose is the largest member of which family?", opts: ["The bear family", "The deer family", "The cattle family", "The horse family"], a: 1, why: "Moose are the largest deer on Earth — a big bull can top 1,000 pounds." },
  { subjectId: 'a-moose', q: "Where are you most likely to find a moose?", opts: ["Open grassland", "Near willows and water", "High rocky cliffs", "Inside geyser basins"], a: 1, why: "Moose browse willows and aquatic plants, so wetlands, rivers, and lakeshores are your best bet." },

  { subjectId: 'a-coyote', q: "Compared with a wolf, a coyote is...", opts: ["The same size", "Much smaller", "Much larger", "A kind of fox"], a: 1, why: "Coyotes weigh only about 25–35 lb — a fraction of a wolf's 100+ — with a narrower snout and bigger ears." },
  { subjectId: 'a-coyote', q: "After wolves returned, Yellowstone's coyote numbers...", opts: ["Boomed", "Dropped sharply in wolf territory", "Stayed exactly the same", "Went extinct"], a: 1, why: "Wolves outcompete and kill coyotes, so coyote numbers fell in wolf country — the survivors learned to keep clear." },

  { subjectId: 'a-eagle', q: "Why is the bald eagle called 'bald'?", opts: ["It has no feathers", "From an old word meaning white-headed", "It has a bald patch", "Its chicks are bald"], a: 1, why: "'Bald' comes from an old word for white-headed — and that white head only appears at about 4–5 years old." },
  { subjectId: 'a-eagle', q: "Where do bald eagles hunt in Yellowstone?", opts: ["In caves", "Near rivers and lakes, for fish", "In the geyser basins", "Underground"], a: 1, why: "They stick close to water like the Yellowstone River and Lake, hunting fish and waterfowl — and sometimes pirating other birds' catches." },
];

export const yellowstone: Park = {
  slug: 'yellowstone',
  name: 'Yellowstone',
  region: 'Wyoming · Montana · Idaho',
  tagline: "Standing somewhere remarkable? Search it or tap a spot for the stories, numbers, and oddities behind what you're looking at.",
  safetyNote:
    'A trailside reference, not a park guide — always follow posted signs. Stay on boardwalks; thermal water can kill. Keep 100 yd from bears & wolves, 25 yd from other wildlife. Facts compiled from the National Park Service, USGS Yellowstone Volcano Observatory, and park references.',
  decks: [
    { id: 'places', label: 'Places', dotColor: '#3F8FD0', subjects: places, quiz: placesQuiz },
    { id: 'animals', label: 'Animals', dotColor: '#C5873C', subjects: animals, quiz: animalsQuiz },
  ],
};
