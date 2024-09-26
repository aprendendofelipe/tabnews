import createConfig from '@tabnews/config/vitest';

const config = createConfig({
  test: {
    coverage: {
      exclude: ['./*.*'],
    },
    environment: 'jsdom',
  },
});

export default config;
