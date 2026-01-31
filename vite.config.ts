import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 레포지토리 이름이 '260127_Trieb_landing'인 경우
  base: '/260127_Trieb_landing/',
})