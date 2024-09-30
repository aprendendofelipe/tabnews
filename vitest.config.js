import createConfig from '@tabnews/config/vitest';

const config = createConfig({
  test: {
    isolate: true,
    coverage: {
      exclude: ['./*.*'],
    },
    environment: 'jsdom',
    setupFiles: ['tests/setup.js'],
  },
});

export default config;
