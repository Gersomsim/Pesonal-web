// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://gersom.me',
  vite: { plugins: [tailwindcss()] },
  output: 'static',
});
