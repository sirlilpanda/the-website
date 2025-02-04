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
  redirects: {
    'linkedin' : 'https://www.linkedin.com/in/logan-henderson-529865268/',
  },
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