import viteReact from '@vitejs/plugin-react'
// @ts-ignore
import fs from 'fs'
import { defineConfig, loadEnv } from 'vite'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  console.log('process.env: ', process.env.VITE_HTTPS_KEY_PATH, process.env.VITE_HTTPS_CER_PATH)

  return defineConfig({
    css: {
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript
          javascriptEnabled: true
          // 重写 less 变量，定制样式
        }
      }
    },
    server: {
      https: {
        key: fs.readFileSync(process.env.VITE_HTTPS_KEY_PATH),
        cert: fs.readFileSync(process.env.VITE_HTTPS_CER_PATH)
      }
    },
    plugins: [viteReact()]
  })
}
