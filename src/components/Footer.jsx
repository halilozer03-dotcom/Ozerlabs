import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer>
      <div>{t.footer.copyright}</div>
      <a href="#iletisim">{t.footer.cta}</a>
    </footer>
  )
}
