const config = {
  '*.{js,mjs,cjs,jsx}': (stagedFiles) => [
    `eslint --fix ${stagedFiles.join(' ')}`,
    `prettier --write ${stagedFiles.join(' ')}`,
  ],
  '*.{json,md}': (stagedFiles) => [`prettier --write ${stagedFiles.join(' ')}`],
  '**/package.json': () => ['npm --prefix ./ install', 'git add package-lock.json'],
};

export default config;
