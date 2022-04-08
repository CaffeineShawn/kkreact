import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
// @ts-ignore
import fs from 'fs'

export default defineConfig({
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
      key: fs.readFileSync('./.cert/key.pem'),
      cert: fs.readFileSync('./.cert/cert.pem')
    }
  },
  plugins: [viteReact()]
})
