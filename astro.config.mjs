import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://kzervaki.github.io',
  base: '/profsite',
  outDir: 'docs',
  prefetch: {
    prefetch: true, // enable prefetching
    defaultStrategy: 'hover', // 'tap' | 'hover' | 'viewport'
    throttle: 3,  // throttle prefetch requests
    prefetchAll: false, // prefetch all links by default
  },
});
