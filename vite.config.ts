import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5432,
    host: '0.0.0.0',
    // proxy: {
    //   '/api': {
    //     target: 'https://dd-api.dev.deploy.nl/v1',
    //     changeOrigin: true,
    //     secure: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   }
    // }
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `@import "@/sass/all.sass"`
      }
    }
  },
  resolve: {
    alias: {
      'SRC_BASE': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: '/'
})
