import defaultConfig from '@tabnews/config/eslint';

const config = [
  ...defaultConfig,
  {
    rules: {
      'import/extensions': ['error', 'always', { ignorePackages: true }],
      'import/no-useless-path-segments': ['error', {}],
    },
  },
];

export default config;
