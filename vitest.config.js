import createConfig from '@tabnews/config/vitest';

const config = createConfig({
  test: {
    environment: 'jsdom',
  },
});

export default config;
