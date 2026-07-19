import createConfig from 'barso/vitest';
import path from 'node:path';

const config = createConfig({
  resolve: {
    alias: [
      {
        find: /^(?:@barso|packages)\/([^/]+)(?:\/(.+))?$/,
        replacement: path.resolve('./packages/$1/src/$2'),
      },
    ],
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['tests/setup.js'],
  },
});

export default config;
