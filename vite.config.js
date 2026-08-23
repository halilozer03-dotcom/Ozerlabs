import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Sitenin varsayılan başlığı ve açıklaması index.html'de yazılıdır ve tek
 * kaynak orasıdır. Blog sayfaları kendi statik başlıklarıyla sunulduğu için
 * bileşenlerin ayrılırken dönecekleri varsayılana da ihtiyaçları var; ikinci
 * bir kopya yazmak yerine değer derleme anında index.html'den okunur.
 * Kalıp bulunamazsa derleme burada kırılır — sessiz yanlış değer üretilmez.
 */
function readIndexMeta() {
  const html = readFileSync(fileURLToPath(new URL('./index.html', import.meta.url)), 'utf8')

  const pick = (re, label) => {
    const found = html.match(re)
    if (!found) throw new Error(`vite.config: index.html içinde "${label}" bulunamadı`)
    return found[1]
  }

  return {
    title: pick(/<title>([^<]*)<\/title>/, 'title'),
    description: pick(/<meta name="description" content="([^"]*)"\s*\/>/, 'meta[name=description]'),
  }
}

const indexMeta = readIndexMeta()

export default defineConfig({
  plugins: [react()],
  define: {
    __SITE_TITLE__: JSON.stringify(indexMeta.title),
    __SITE_DESCRIPTION__: JSON.stringify(indexMeta.description),
  },
  build: {
    assetsDir: '', // tüm dosyalar dist/ kökünde, alt klasör yok — mobil yüklemede kolaylık için
  },
})
