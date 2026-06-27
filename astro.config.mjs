// @ts-check
import { defineConfig } from 'astro/config';

// Static output, islands by default. Editorial content ships ~zero JS;
// only the motion <script> blocks hydrate per-route (Brand Foundations 4.4).
//
// GitHub Pages serves a project site under /<repo>/, so when building in the
// Pages workflow we set a base path. Locally `base` stays "/" so dev/preview
// and any root-domain host (Vercel/Netlify) work unchanged. All internal links
// and assets go through import.meta.env.BASE_URL so both modes resolve.
const isPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  site: isPages ? 'https://dinhamb.github.io' : 'https://beacondiagnostics.example',
  base: isPages ? '/Beacon-Diagnostics' : undefined,
  build: {
    // Inline small stylesheets to cut request count on a mostly-static site.
    inlineStylesheets: 'auto',
  },
  prefetch: {
    // Cheap perceived-speed win between the gateway and service tracks.
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
