import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://konzervaki.com',
  base: '/',
  outDir: 'docs',
  prefetch: {
    prefetch: true, // enable prefetching
    defaultStrategy: 'hover', // 'tap' | 'hover' | 'viewport'
    throttle: 3,  // throttle prefetch requests
    prefetchAll: false, // prefetch all links by default
  },
  build: {
    inlineStylesheets: 'auto', // reduces extra requests
  },
  compressHTML: true, // minifies HTML
});
