import defaultConfig from 'barso/eslint';

const config = [
  ...defaultConfig,
  {
    rules: {
      'import/no-useless-path-segments': ['error', {}],
    },
  },
];

export default config;
