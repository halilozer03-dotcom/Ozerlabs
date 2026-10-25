/**
 * Dönüşüm hunisi olayları → POST /api/event → Workers Analytics Engine
 * (worker/index.js). Cloudflare Web Analytics yalnız sayfa görüntülemesi
 * sayar, özel olay desteklemez; huni bu yüzden kendi ucumuzdan ölçülür.
 *
 * GİZLİLİK: yalnız olay adı, konu (web/metaliq/bendiq/other), hata veren
 * ALAN ADLARI, sayfa dili ve yol gönderilir. İsim, e-posta, mesaj metni,
 * IP ya da çerez YOK. Sunucu da yalnız bu alanları yazar.
 *
 * Huni:
 *   store_click     BENDIQ Google Play bağlantısına tıklama — KURULUM ya da
 *                   SATIN ALMA DEĞİLDİR; mağazada ne olduğunu ölçmeyiz.
 *   cad_demo_view   METALIQ demo bölümü ekranda görüldü (sayfa başına bir kez)
 *   form_start      formdaki ilk alana yazılmaya başlandı (form başına bir kez)
 *   form_error      gönderimde istemci doğrulaması alan reddetti
 *   form_delivered  SUNUCU tarafından yazılır: e-posta gerçekten gönderildi
 *                   (istemci bu olayı gönderemez — bkz. worker/index.js)
 */
const CLIENT_EVENTS = new Set(['store_click', 'cad_demo_view', 'form_start', 'form_error'])

export function track(name, props = {}) {
  if (typeof window === 'undefined' || !CLIENT_EVENTS.has(name)) return
  const body = JSON.stringify({
    e: name,
    topic: props.topic || '',
    fields: Array.isArray(props.fields) ? props.fields.join(',') : '',
    lang: document.documentElement.lang || '',
    path: window.location.pathname,
  })
  try {
    const blob = new Blob([body], { type: 'application/json' })
    if (navigator.sendBeacon && navigator.sendBeacon('/api/event', blob)) return
    fetch('/api/event', { method: 'POST', body, headers: { 'content-type': 'application/json' }, keepalive: true }).catch(() => {})
  } catch {
    /* ölçüm hiçbir zaman sayfayı bozmaz */
  }
}
