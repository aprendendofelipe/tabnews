import { builtinModules } from 'node:module';
import path from 'node:path';

export function getBaseConfig() {
  const builtinExternals = [...builtinModules, ...builtinModules.map((m) => `node:${m}`)];

  return {
    build: {
      lib: {
        entry: './src/index.js',
        formats: ['es', 'cjs'],
        fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
      },
      rollupOptions: {
        external: (id) => {
          if (builtinExternals.includes(id)) return true;
          return !id.startsWith('.') && !path.isAbsolute(id);
        },
        output: {
          externalLiveBindings: false,
        },
      },
    },
  };
}
