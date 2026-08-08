/* Marka görsellerini public/brand altına hazırlar.
   Müşteri logoları daha önce müşterinin kendi sitesinden hotlink
   ediliyordu; o site değişince portföyümüz bozuluyordu. Artık
   kaynaklar burada, çıktı depoya işleniyor.

   Kaynaklar depo dışında (müşteri klasörü) durduğu için betik yalnızca
   elle çalıştırılır: npm run brand
   Üretilen .webp dosyaları depoda tutulur, derleme buna bağlı değildir. */

import sharp from 'sharp'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const MUSTERI = 'C:/Users/halil/OneDrive/Desktop/belgeler evraklar/müsteri klasörü/'
const MASAUSTU = 'C:/Users/halil/OneDrive/Desktop/'
const CIKTI = fileURLToPath(new URL('../public/brand/', import.meta.url))

/* Kart logosu 62 px görüntülenir; 256 px retina için fazlasıyla yeter.
   Kare kırpmalar amblemin görsel merkezine göre elle ölçüldü — otomatik
   sınır bulma dokulu arka planlarda (gri duvar, atölye fotoğrafı) şaşıyor. */
const ISLER = [
  {
    ad: 'ozerlabs-lockup',
    kaynak: MASAUSTU + 'file_00000000014071f48a82220190b8ca6e.png',
    boy: 800,
  },
  {
    ad: 'hd-auto',
    kaynak: MUSTERI + 'HD-Auto/assets/hd-auto-icon.png',
    kirp: { left: 160, top: 170, width: 350, height: 350 },
    boy: 256,
  },
  {
    ad: 'maison-fairouz',
    kaynak: MUSTERI + 'Maison-Fairouz/src/assets/brand/logo.jpg',
    boy: 256,
  },
  {
    ad: 'prod-metal',
    kaynak: MASAUSTU + 'logo-banner.png',
    kirp: { left: 110, top: 50, width: 495, height: 495 },
    boy: 256,
  },
]

await mkdir(CIKTI, { recursive: true })

for (const is of ISLER) {
  let p = sharp(is.kaynak)
  if (is.kirp) p = p.extract(is.kirp)
  const hedef = join(CIKTI, `${is.ad}.webp`)
  const bilgi = await p
    .resize(is.boy, is.boy, { fit: 'cover' })
    .webp({ quality: 88 })
    .toFile(hedef)
  console.log(`${is.ad}.webp  ${bilgi.width}x${bilgi.height}  ${(bilgi.size / 1024).toFixed(1)} KB`)
}

/* --- İkonlar ---
   index.html'deki 32 px ve apple-touch ikonu base64 gömülüdür (favicon
   için ek istek olmasın diye). Tek kaynak public/favicon.svg; buradan
   türetilip index.html içindeki iki href yerinde güncellenir. Elle
   base64 kopyalamak, işaret değişince sessizce eskimeye yol açıyordu. */
const kokDizin = fileURLToPath(new URL('../', import.meta.url))
const favikon = await readFile(join(kokDizin, 'public/favicon.svg'))

const ikonB64 = async (px) =>
  (await sharp(favikon, { density: 384 }).resize(px, px).png().toBuffer()).toString('base64')

const ikon32 = await ikonB64(32)
const ikon180 = await ikonB64(180)

const indexYolu = join(kokDizin, 'index.html')
let html = await readFile(indexYolu, 'utf8')
const oncesi = html

html = html
  .replace(
    /(<link rel="icon" type="image\/png" sizes="32x32" href="data:image\/png;base64,)[^"]*"/,
    `$1${ikon32}"`
  )
  .replace(
    /(<link rel="apple-touch-icon" href="data:image\/png;base64,)[^"]*"/,
    `$1${ikon180}"`
  )

if (html === oncesi) {
  console.warn('UYARI: index.html icindeki ikon satirlari bulunamadi, guncellenmedi.')
} else {
  await writeFile(indexYolu, html)
  console.log(`ikon 32px + apple-touch 180px  -> index.html guncellendi`)
}
