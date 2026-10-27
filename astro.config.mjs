import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://cocofhu-astro-replica-1026.wangkan35.chatgpt.site',
  integrations: [react(), markdoc(), ...(process.env.SKIP_KEYSTATIC === '1' ? [] : [keystatic()])],
  output: 'static',
  devToolbar: { enabled: false },
  vite: {
    resolve: { noExternal: ['animal-island-ui'] },
    environments: { prerender: { resolve: { noExternal: ['animal-island-ui'] } } },
  },
});
