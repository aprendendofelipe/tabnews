import defaultConfig from '@tabnews/config/eslint';

const config = [
  ...defaultConfig,
  {
    ignores: ['**/.next/**', '**/__snapshots__/*'],
  },
];

export default config;
