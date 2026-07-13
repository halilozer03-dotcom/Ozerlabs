import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: '', // tüm dosyalar dist/ kökünde, alt klasör yok — mobil yüklemede kolaylık için
  },
})
