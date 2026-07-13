import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://cortex-os.dev',
  integrations: [sitemap()],
  build: {
    // Keep the homepage's inline <style is:inline> verbatim and inline any
    // bundled blog CSS too, so pages stay self-contained (no external CSS fetch).
    inlineStylesheets: 'always',
  },
});
