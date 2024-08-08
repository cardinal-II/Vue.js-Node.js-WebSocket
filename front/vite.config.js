import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  let port;
  let base;

  if (process.env.VITE_ENV == 'development') {
    port = process.env.VITE_DEVELOPMENT_FRONTEND_PORT
    base = '/'
  }
  if (process.env.VITE_ENV == 'production') {
    base = process.env.VITE_PRODUCTION_FRONT_DIRECTORY
  }

  //console.log('vite.config.js', port);
  
  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: true,
      port: port
    },
    base: base
  })
}
