import { useReveal } from '../hooks/useReveal.js'

/**
 * Görünüme girince beliren sarmalayıcı.
 * `as` ile hangi etiket olarak render edileceği seçilir; böylece
 * anlamsal HTML bozulmadan (li, article, section…) animasyon eklenir.
 */
export default function Reveal({ as: Tag = 'div', children, delay = 0, className = '', ...rest }) {
  const [ref, visible] = useReveal()

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
