import createConfig from '@tabnews/config/vitest';

const config = createConfig({
  test: {
    coverage: {
      exclude: ['./*.*', '**/dist/*.*', '**/.next/**/*.*', '**/*.config.*'],
    },
    environment: 'jsdom',
    setupFiles: ['tests/setup.js'],
  },
});

export default config;
