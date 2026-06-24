import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// A dedicated Vitest config (kept separate from vite.config.ts so the Cloudflare
// Workers plugin isn't loaded under the test runner). jsdom gives the hook and
// localStorage tests a DOM to run against.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
