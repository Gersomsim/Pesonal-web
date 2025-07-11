// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
// https://astro.build/config
export default defineConfig({
  site: 'https://gersom.me',
  integrations: [mdx(), sitemap(), react()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      langs: [],
    },
    syntaxHighlight: 'shiki',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});
