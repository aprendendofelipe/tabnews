import createConfig from '@tabnews/config/vitest';

const config = createConfig({
  test: {
    isolate: true,
    coverage: {
      exclude: ['./*.*', '**/dist/*.*'],
    },
    environment: 'jsdom',
    setupFiles: ['tests/setup.js'],
  },
});

export default config;
