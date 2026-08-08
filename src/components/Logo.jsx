/* Marka işareti — vektörel.
   Halka marka gradyanını, "Z" ise currentColor'ı kullanır; böylece
   koyu hero üstünde beyaz, camlaşmış açık navigasyonda lacivert olur.
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
        <linearGradient id={`ring-${gid}`} x1="4" y1="40" x2="42" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="52%" stopColor="#2563EB" />
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

      {/* Kesişen "Z" */}
      <path
        d="M18.5 13.5 H38 L18 34.5 H38"
        fill="none"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinejoin="miter"
        strokeMiterlimit="3"
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
