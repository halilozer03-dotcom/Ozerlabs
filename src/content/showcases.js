/* Tanıtım penceresi medyası — dilden bağımsız TEK kaynak.
   Metinler (açıklama, maddeler, alt metinleri) translations.js'te, proje
   kaydının `showcase` alanında; buradaki `key` ile eşleşir.

   METALIQ: görüntü ve video çalışan aracın kendisinden çekildi (headless
   Chrome, gerçek GPU) — maket ya da çizim değil. Araç ücretli verileceği
   için kart canlı adrese bağlanmaz; yalnızca bu pencere açılır. Kadraj
   yalnızca 3D alanı ve araç çubuğudur, aracın üstteki marka satırı
   hiçbir karede yoktur. */
export const SHOWCASE_MEDIA = {
  metaliq: {
    video: {
      src: '/showcase/metaliq/metaliq-demo.mp4',
      poster: '/showcase/metaliq/poster.webp',
      width: 1280,
      height: 882,
    },
    images: [
      { key: 'pergola', width: 1600, height: 1104 },
      { key: 'escalier', width: 1600, height: 1104 },
      { key: 'interface', width: 1600, height: 938 },
      { key: 'mezzanine', width: 1600, height: 1104 },
      { key: 'ferforge', width: 1600, height: 1104 },
      { key: 'portail', width: 1600, height: 1104 },
    ].map((im) => ({
      ...im,
      src: `/showcase/metaliq/${im.key}-1600.webp`,
      thumb: `/showcase/metaliq/${im.key}-480.webp`,
    })),
  },
}
