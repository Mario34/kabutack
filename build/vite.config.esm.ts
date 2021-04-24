import { defineConfig } from 'vite'
import VuePlugin from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import MdPlugin from './md-plugin'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueJsx(),
    VuePlugin({
      include: [/\.vue$/],
    }),
    MdPlugin(),
  ],
  publicDir: 'null',
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, '../src'),
      '/@r': path.resolve(__dirname, '../'),
    },
  },
  base: './',
  build: {
    target: 'es2015',
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, '../src/index.ts'),
      formats: ['es'],
    },
    minify: true,
    sourcemap: false,
    rollupOptions: {
      input: path.resolve(__dirname, '../src/index.ts'),
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
