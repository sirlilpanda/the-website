import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import tailwind from '@astrojs/tailwind';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://sirlilpanda.studio',
  integrations: [mdx(), sitemap(), tailwind()],

  markdown:{
      remarkPlugins: [remarkMath],
      rehypePlugins: [
          rehypeKatex,
      ]
  },

  output: "server",

  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
});