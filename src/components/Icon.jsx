/* Tek ikon sistemi.
   Kural: 24x24 kutu, 1.75 stroke, yuvarlak uç, dolgu yok, currentColor.
   Yeni ikon yalnızca buraya eklenir — bileşenler ham <svg> yazmaz. */

const PATHS = {
  'arrow-right': <path d="M5 12h14M13 6l6 6-6 6" />,
  'arrow-up-right': <path d="M7 17 17 7M8 7h9v9" />,
  'chevron-right': <path d="m9 6 6 6-6 6" />,
  check: <path d="m4 12.5 5 5L20 6.5" />,
  'check-circle': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
    </>
  ),
  smartphone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </>
  ),
  cpu: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10.5 10.5h3v3h-3zM12 3v4M12 17v4M3 12h4M17 12h4M8 3v4M16 3v4M8 17v4M16 17v4M3 8h4M3 16h4M17 8h4M17 16h4" />
    </>
  ),
  layers: <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3ZM3.5 12.2 12 16.7l8.5-4.5M3.5 16.7 12 21.2l8.5-4.5" />,
  'shopping-bag': (
    <>
      <path d="M6.5 2.5 4 6.5V20a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 20V6.5l-2.5-4Z" />
      <path d="M4 6.5h16" />
      <path d="M15.5 10.5a3.5 3.5 0 0 1-7 0" />
    </>
  ),
  'calendar-check': (
    <>
      <rect x="3.5" y="5" width="17" height="16.5" rx="2.5" />
      <path d="M8 2.5v5M16 2.5v5M3.5 10.5h17" />
      <path d="m9 15.5 2.2 2.2 4-4.2" />
    </>
  ),
  'map-pin': (
    <>
      <path d="M20 10.5c0 5.2-8 11-8 11s-8-5.8-8-11a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10.5" r="2.8" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.4 2" />
    </>
  ),
  sparkles: <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5ZM18.5 3v3M20 4.5h-3M19 17v2.5M20.25 18.25h-2.5" />,
  zap: <path d="M13.5 2.5 4.8 13.2h6.2l-.5 8.3 8.7-10.7h-6.2l.5-8.3Z" />,
  code: <path d="m8.5 8-4.5 4 4.5 4M15.5 8l4.5 4-4.5 4M13.5 4.5l-3 15" />,
  'user-check': (
    <>
      <circle cx="9.5" cy="7.5" r="3.8" />
      <path d="M2.8 20.5c0-3.6 3-6.2 6.7-6.2 1.4 0 2.7.4 3.8 1M16 17.5l2 2 4-4" />
    </>
  ),
  rocket: (
    <>
      <path d="M12.5 3.5c3.6 1 6.2 4 7 7.5-2 3.2-5.2 5.4-8.8 6.1l-3.8-3.8C7.6 9.7 9.6 6.2 12.5 3.5Z" />
      <circle cx="14.2" cy="9.8" r="1.7" />
      <path d="m6.9 13.3-2.4.8-.7 2.9 2.6-.4M10.7 17.1l-.8 2.4 2.9.7-.4-2.6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.8 4.5 6v6c0 4.5 3.1 8.1 7.5 9.2 4.4-1.1 7.5-4.7 7.5-9.2V6L12 2.8Z" />
      <path d="m9 12 2.2 2.2L15.3 10" />
    </>
  ),
  'message-circle': <path d="M20.5 11.6a8.4 8.4 0 0 1-11.9 7.6L3.5 20.5l1.4-5A8.4 8.4 0 1 1 20.5 11.6Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  github: (
    <path d="M9 19.5c-4.5 1.4-4.5-2.3-6.3-2.8m12.6 5.3v-3.5c0-1 .1-1.4-.5-2 2.5-.3 4.9-1.3 4.9-5.5a4.3 4.3 0 0 0-1.2-3 4 4 0 0 0-.1-3s-1-.3-3.2 1.2a11 11 0 0 0-5.7 0C7.3 4.7 6.3 5 6.3 5a4 4 0 0 0-.1 3 4.3 4.3 0 0 0-1.2 3c0 4.2 2.4 5.2 4.9 5.5-.6.6-.6 1.2-.5 2v3.5" />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7.5 10.5V17M7.5 7.2v.1M11.5 17v-3.6a2 2 0 0 1 4 0V17M11.5 10.5V17" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="M17.2 6.8v.1" />
    </>
  ),
}

export default function Icon({ name, size = 20, className, strokeWidth = 1.75, ...rest }) {
  const path = PATHS[name]
  if (!path) return null

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {path}
    </svg>
  )
}
