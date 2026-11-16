import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base를 상대 경로로 두어 GitHub Pages 같은 하위 경로 배포에서도 동작하게 한다.
export default defineConfig({
  base: './',
  plugins: [react()],
})
