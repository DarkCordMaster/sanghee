import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // 프론트 dev 서버(5173)와 Spring Boot 서버(8080)가 포트가 달라서 생기는
      // CORS 문제를 피하려고 /api 요청을 백엔드로 그대로 넘겨줌.
      // 백엔드 포트가 바뀌면 이 target만 고치면 됨.
      '/api': 'http://localhost:8080',
    },
  },
})
