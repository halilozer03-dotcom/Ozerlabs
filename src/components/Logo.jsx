/* Marka işareti — vektörel. Kaynak logodaki "OL" monogramı:
   açık halka "O", üzerine binen eğik "L".
   Halka marka gradyanını (üstte camgöbeği → altta mor), "L" ise
   currentColor'ı kullanır; böylece koyu hero üstünde beyaz,
   camlaşmış açık navigasyonda lacivert olur.
   Gradyan id'si örnek başına benzersiz üretilir (aynı sayfada birden
   fazla logo olduğunda id çakışması olmasın diye). */

import { useId } from 'react'

export function LogoMark({ size = 36, className }) {
  const gid = useId().replace(/:/g, '')

  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Ozerlabs"
      focusable="false"
    >
      <defs>
        {/* Yön kaynak logoyla aynı: tepede camgöbeği, sol alt uçta mor. */}
        <linearGradient id={`ring-${gid}`} x1="34" y1="9" x2="12" y2="39" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="55%" stopColor="#2F6BF0" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
      </defs>

      {/* Açık halka — "O" */}
      <path
        d="M33.5 14.5 A13.5 13.5 0 1 0 33.5 33.5"
        fill="none"
        stroke={`url(#ring-${gid})`}
        strokeWidth="5.5"
        strokeLinecap="butt"
      />

      {/* Halkanın üzerine binen eğik "L" — kaynak logodaki gibi
          sağ üstten sol alta iner, ayak sağa uzanır. */}
      <path
        d="M32.5 11.5 L23 34 H38"
        fill="none"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinejoin="miter"
        strokeMiterlimit="3"
        strokeLinecap="butt"
      />
    </svg>
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
