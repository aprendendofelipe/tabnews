import react from '@vitejs/plugin-react-swc';
import { preserveDirectives } from 'rollup-plugin-preserve-directives';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), preserveDirectives()],
  build: {
    lib: {
      entry: {
        index: './src/index.js',
        _document: './src/_document.jsx',
        markdown: './src/Markdown/index.js',
        primer: './src/primer-react.js',
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: [/^react/, /^next\//, /^@primer\//, /^styled-components/, /^@bytemd\//, /^rehype-/],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        externalLiveBindings: false,
        reexportProtoFromExternal: false,
        preserveModules: true,
      },
    },
  },
});
