import { preserveDirectives } from 'rollup-plugin-preserve-directives';
import { defineConfig, mergeConfig } from 'vite';

import { getBaseConfig } from '../../vite.lib.config.js';

export default defineConfig(
  mergeConfig(getBaseConfig(), {
    plugins: [preserveDirectives()],
    build: {
      rollupOptions: {
        output: {
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
      },
    },
  }),
);
