import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        index: './src/index.js',
        _document: './src/_document.jsx',
      },
      formats: ['cjs'],
    },
    rollupOptions: {
      external: ['@primer/react', 'styled-components', 'react', 'react-dom', 'next/document.js'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
