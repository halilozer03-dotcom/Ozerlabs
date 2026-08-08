import Reveal from './Reveal.jsx'

/**
 * Her bölümün başlığı buradan çıkar: aynı eyebrow → başlık → açıklama
 * ritmi, aynı boşluklar. `action` verilirse başlık sağa hizalı bir
 * bağlantıyla ikiye bölünür.
 */
export default function SectionHead({ eyebrow, title, sub, action, center = false, id }) {
  const variant = action ? ' section-head--split' : center ? ' section-head--center' : ''

  return (
    <Reveal className={`section-head${variant}`}>
      <div className="section-head__body">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 className="section-title" id={id}>
          {title}
        </h2>
        {sub && <p className="section-sub">{sub}</p>}
      </div>
      {action}
    </Reveal>
  )
}
