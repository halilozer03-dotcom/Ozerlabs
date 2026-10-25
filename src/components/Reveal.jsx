import { useReveal } from '../hooks/useReveal.js'

/**
 * Görünüme girince beliren sarmalayıcı (bkz. hooks/useReveal.js — ilk ekran
 * hiç gizlenmez). `as` ile hangi etiket olarak çizileceği seçilir; anlamsal
 * HTML (li, article, section…) bozulmaz.
 */
export default function Reveal({ as: Tag = 'div', children, delay = 0, className = '', ...rest }) {
  const [ref, state] = useReveal()
  const cls = ['reveal', state === 'armed' && 'reveal--armed', state === 'shown' && 'reveal--armed is-visible', className]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag ref={ref} className={cls} style={delay && state !== 'static' ? { transitionDelay: `${delay}ms` } : undefined} {...rest}>
      {children}
    </Tag>
  )
}
