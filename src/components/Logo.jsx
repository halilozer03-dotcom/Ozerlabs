/* Marka işareti — kaynak logonun kendisi.
   Daha önce burada vektörel bir yeniden çizim vardı; kabartma yüzeyi ve
   gradyan geçişlerini taşımadığı için "logo değişmemiş" hissi veriyordu.
   Artık public/brand/ozerlabs-mark.png kullanılıyor: orijinal çizimden
   kesilmiş, arka planı şeffaflaştırılmış O+L monogramı (bkz.
   scripts/prep-brand-assets.mjs).

   Devre izleri ve AI çipi işaretin dışında bırakıldı — 36 px'te okunmaz
   bir bulamaca dönüyorlardı. Tam kilitleme (slogan + alan adı) site
   kromuna hiç girmez: içeriği Türkçe sabit, site ise üç dilli. */

export function LogoMark({ size = 36, className }) {
  // Kaynak 196x144; en-boy oranı korunsun diye genişlik ondan türetilir.
  const width = Math.round((size * 196) / 144)

  return (
    <img
      src="/brand/ozerlabs-mark.png"
      width={width}
      height={size}
      className={className}
      alt=""
      decoding="async"
      draggable="false"
    />
  )
}

export default function Logo({ size = 36, className, showWord = true }) {
  return (
    <span className={`brand ${className || ''}`.trim()}>
      <LogoMark size={size} className="brand__mark" />
      {showWord && (
        <span className="brand__word">
          OZER<em>LABS</em>
        </span>
      )}
    </span>
  )
}
