import { readFileSync } from 'node:fs';

export function getBaseConfig() {
  const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
  const externalDeps = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})];

  return {
    build: {
      lib: {
        entry: './src/index.js',
        formats: ['es', 'cjs'],
        fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
      },
      rollupOptions: {
        external: (id) => externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`)),
        output: {
          externalLiveBindings: false,
        },
      },
    },
  };
}
