import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { join } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import DefineOptions from 'unplugin-vue-define-options/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    symbolId: 'icon-[name]'
  }), DefineOptions()],
  resolve: {
    alias: {
      '@': join(__dirname, '/src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.imooc-front.lgdsunday.club/',
        changeOrigin: true
      }
    }
  }
})
