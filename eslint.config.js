import defaultConfig from '@tabnews/config/eslint';

const config = [
  ...defaultConfig,
  {
    rules: {
      'import/no-useless-path-segments': ['error', {}],
    },
  },
];

export default config;
