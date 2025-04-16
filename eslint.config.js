import defaultConfig from '@tabnews/config/eslint';

const config = [
  ...defaultConfig,
  { rules: { '@next/next/no-html-link-for-pages': 0, 'import/no-useless-path-segments': ['error', {}] } },
];

export default config;
