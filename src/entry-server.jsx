import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppShell } from './App.jsx'
import { HeadContext } from './hooks/useSeo.js'

/**
 * Derleme anında bir adresi HTML'e çevirir (scripts/prerender.mjs çağırır).
 * Rota bileşeni useSeo ile kendi <head> verisini toplayıcıya yazar.
 * Dönen meta null ise rota bilinmeyen bir yazıdır (404).
 */
export function render(url) {
  const collector = { meta: null }
  const html = renderToString(
    <HeadContext.Provider value={collector}>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </HeadContext.Provider>,
  )
  return { html, meta: collector.meta }
}
