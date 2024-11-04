import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        index: './src/index.js',
        _document: './src/_document.jsx',
        primer: './src/primer-react.js',
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: [/^react/, /^next\//, /^@primer\//, /^styled-components/],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        externalLiveBindings: false,
        reexportProtoFromExternal: false,
      },
    },
  },
});
