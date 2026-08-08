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

const kokDizin = fileURLToPath(new URL('../', import.meta.url))

/* --- Marka işareti: kaynak çizimin kendisi ---
   Navigasyon ve footer'da vektörel yeniden çizim değil, logonun gerçek
   O+L monogramı kullanılır (kabartma yüzey, gradyan, hepsi orijinal).

   Devre izleri ve AI çipi bilerek dışarıda: 36 px'te okunmaz bir
   bulamaca dönüyorlar. Kırpmanın sağ ucunda kalan iz parçaları da
   elenir, yoksa kesik çizgi gibi görünüyorlar.

   Arka plan tekdüze #02040F. Site zemini #070B14 — yakın ama aynı
   değil, opak bırakılırsa işaretin çevresinde kare iz görünüyor.
   O yüzden parlaklık alfaya çevrilip RGB geri ölçekleniyor. */
const MARK_KUTU = { left: 300, top: 280, width: 560, height: 410 }
const MARK_ESIK = 20
const MARK_YUMUSAK = 38
/* Halkanın sağ kenarı kırpma içinde ~380 px'te biter; ondan sağda kalan
   koyu/doygun her şey devre izidir. L parlak-nötr olduğu için elenmez. */
const MARK_IZ_X = 395

const markHam = await sharp(ISLER[0].kaynak).extract(MARK_KUTU).png().toBuffer()
const { data: mData, info: mInfo } = await sharp(markHam)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const mCikti = Buffer.alloc(mInfo.width * mInfo.height * 4)
for (let i = 0; i < mInfo.width * mInfo.height; i++) {
  const o = i * 4
  const r = mData[o], g = mData[o + 1], b = mData[o + 2]
  if (i % mInfo.width > MARK_IZ_X && Math.min(r, g, b) < 90) continue // alfa 0 kalır
  let a = (Math.max(r, g, b) - MARK_ESIK) / MARK_YUMUSAK
  a = a <= 0 ? 0 : a >= 1 ? 1 : a * a * (3 - 2 * a)
  const k = a > 0 ? 1 / a : 0
  mCikti[o] = Math.min(255, r * k)
  mCikti[o + 1] = Math.min(255, g * k)
  mCikti[o + 2] = Math.min(255, b * k)
  mCikti[o + 3] = Math.round(a * 255)
}

const markSeffaf = await sharp(mCikti, {
  raw: { width: mInfo.width, height: mInfo.height, channels: 4 },
})
  .trim({ threshold: 1 })
  .png()
  .toBuffer()

// 36 px'lik işaretin 4 katı: retina ekranda da net
const markBilgi = await sharp(markSeffaf)
  .resize({ height: 144 })
  .png({ compressionLevel: 9 })
  .toFile(join(CIKTI, 'ozerlabs-mark.png'))
console.log(
  `ozerlabs-mark.png  ${markBilgi.width}x${markBilgi.height}  ${(markBilgi.size / 1024).toFixed(1)} KB`
)

/* --- İkonlar ---
   index.html'deki 32 px ve apple-touch ikonu base64 gömülüdür (favicon
   için ek istek olmasın diye). İşaret, favicon.svg'deki ile aynı koyu
   yuvarlak karenin üstüne oturtulur. Elle base64 kopyalamak, işaret
   değişince sessizce eskimeye yol açıyordu. */
const ikonB64 = async (px) => {
  const ic = await sharp(markSeffaf)
    .resize({ width: Math.round(px * 0.74), fit: 'inside' })
    .toBuffer()
  const zemin = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}">
       <rect width="${px}" height="${px}" rx="${Math.round(px * 0.23)}" fill="#0B1120"/>
     </svg>`
  )
  return (
    await sharp(zemin).composite([{ input: ic, gravity: 'center' }]).png().toBuffer()
  ).toString('base64')
}

/* Yalnızca 32 px gömülü kalır (~1 KB): en sık istenen ikon, ek istek
   etmesin. 180 ve 192 px ayrı dosya — gerçek çizimden üretilen raster
   base64'e çevrilince index.html 13,5 KB'dan 24 KB'a çıkıyordu. */
const ikon32 = await ikonB64(32)

for (const [ad, px] of [['apple-touch-icon', 180], ['favicon-192', 192]]) {
  const buf = Buffer.from(await ikonB64(px), 'base64')
  await writeFile(join(kokDizin, `public/${ad}.png`), buf)
  console.log(`${ad}.png  ${px}x${px}  ${(buf.length / 1024).toFixed(1)} KB`)
}

const indexYolu = join(kokDizin, 'index.html')
const html = await readFile(indexYolu, 'utf8')

const DESEN = /(<link rel="icon" type="image\/png" sizes="32x32" href="data:image\/png;base64,)[^"]*"/
if (!DESEN.test(html)) {
  console.warn('UYARI: index.html icindeki 32 px ikon satiri bulunamadi.')
} else {
  await writeFile(indexYolu, html.replace(DESEN, `$1${ikon32}"`))
  console.log(`gomulu 32px ikon -> index.html guncellendi (${(ikon32.length / 1024).toFixed(1)} KB base64)`)
}
