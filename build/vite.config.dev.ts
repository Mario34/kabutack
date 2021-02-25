import { defineConfig } from 'vite'
import VuePlugin from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import WindiCSS from 'vite-plugin-windicss'
import MdPlugin from './md-plugin'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueJsx(),
    VuePlugin({
      include: [/\.vue$/, /\.md$/],
    }),
    MdPlugin(),
    WindiCSS(),
  ],
  resolve: {
    alias: [
      {
        find: '/@',
        replacement: path.resolve(__dirname, '../src'),
      },
      {
        find: '/@r',
        replacement: path.resolve(__dirname, '../'),
      },
    ],
  },
  base: './',
})
