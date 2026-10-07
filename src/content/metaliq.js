/* METALIQ bölümünün medyası — dilden bağımsız TEK kaynak.
   Metinler translations.js → `metaliq`; buradaki `key` ile eşleşir.

   Hepsi çalışan araçtan çekildi (headless Chrome, gerçek GPU) — maket ya
   da çizim değil. Video kare kare kaydedildi; aracın üstteki marka satırı
   hiçbir karede yok. Belgeler aracın gerçek çıktısı (imalat dosyası PDF'i
   ve lazer panel DXF'i), proje adı "Démonstration METALIQ".
   Üretim betikleri: ~/.claude/tools/metaliq-showcase/ (record2.cjs,
   assemble2.py, prep_site.py).

   Dosyalar /showcase/ altında kalmalı: Worker bayt aralığı (206) isteğini
   yalnız orada karşılıyor — iOS Safari onsuz videoyu oynatmaz. */
const BASE = '/showcase/metaliq'

export const METALIQ_TYPES = [
  'railing',
  'ferforge',
  'aluminium',
  'verre',
  'portail',
  'devanture',
  'grillage',
  'muret',
  'mezzanine',
  'escalier',
  'pergola',
]

export const METALIQ_MEDIA = {
  video: {
    src: `${BASE}/metaliq-demo.mp4`,
    poster: `${BASE}/poster.webp`,
    width: 1280,
    height: 882,
  },
  tiles: METALIQ_TYPES.map((key) => ({
    key,
    src: `${BASE}/tiles/${key}.webp`,
    width: 720,
    height: 471,
  })),
  // Kart için 4:3 kesit + yeni sekmede açılan tam sayfa.
  docs: Object.fromEntries(
    ['dossier', 'platine', 'module', 'laser'].map((key) => [
      key,
      { src: `${BASE}/docs/${key}.webp`, full: `${BASE}/docs/${key}-full.webp`, width: 800, height: 600 },
    ])
  ),
}
