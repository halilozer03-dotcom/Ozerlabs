/**
 * İletişim formu ucu — POST /api/contact.
 *
 * Neden var: form 08-08'den beri yalnızca `mailto:` ile çalışıyordu. Posta
 * istemcisi kurulu olmayan ziyaretçide hiçbir şey açılmıyor, yazılan mesaj
 * sessizce kayboluyordu. Burası mesajı Cloudflare Email Routing üzerinden
 * doğrudan ozer.labs@gmail.com'a gönderir; istemci tarafı hata alırsa eski
 * `mailto:` yoluna düşer (Contact.jsx), yani mesaj her iki durumda da kaybolmaz.
 *
 * Kapsam bilinçli olarak dar: Worker YALNIZCA /api/* isteklerini görür
 * (wrangler.toml → [assets] run_worker_first). Diğer bütün adresler eskisi
 * gibi statik varlık olarak sunulur; rota başına canonical üreten prerender
 * düzeni ve SPA fallback davranışı değişmez. Buraya düşen /api dışı bir istek
 * olursa varlık sunucusuna geri devredilir.
 */

import { EmailMessage } from 'cloudflare:email'

const TO = 'ozer.labs@gmail.com'
const FROM = 'form@ozerlabs.com'
const FROM_NAME = 'OzerLabs form'
const SITE_ORIGIN = 'https://ozerlabs.com'

/** Alan sınırları: hem kötüye kullanımı hem kazara devasa gövdeyi keser. */
const LIMITS = { name: 100, email: 200, budget: 80, message: 5000 }
const MAX_BODY = 16 * 1024

const json = (data, status) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })

/**
 * Başlık satırına giren her değerden CR/LF atılır: aksi halde ziyaretçi
 * kendi adına satır sonu koyup ek başlık enjekte edebilir (SMTP injection).
 */
const tekSatir = (s, max) => String(s ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max)

const gecerliEposta = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) && s.length <= LIMITS.email

/** UTF-8 → base64 (btoa tek başına yalnız latin1 kabul eder). */
function b64(str) {
  const bytes = new TextEncoder().encode(str)
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin)
}

/** ASCII dışı karakter varsa RFC 2047 encoded-word, yoksa düz metin. */
const baslikMetni = (s) => (/^[\x20-\x7E]*$/.test(s) ? s : `=?UTF-8?B?${b64(s)}?=`)

function mimeOlustur({ name, email, budget, message, meta }) {
  const konu = tekSatir(`OzerLabs — ${name}`, 160)
  const govde = [
    `İsim   : ${name}`,
    `E-posta: ${email}`,
    `Bütçe  : ${budget || '—'}`,
    '',
    '--- Mesaj ---',
    message,
    '',
    '---',
    `Gönderim: ${meta.time}`,
    `Sayfa   : ${meta.page}`,
  ].join('\r\n')

  return [
    `From: ${baslikMetni(FROM_NAME)} <${FROM}>`,
    `To: <${TO}>`,
    `Reply-To: ${baslikMetni(tekSatir(name, LIMITS.name))} <${email}>`,
    `Subject: ${baslikMetni(konu)}`,
    `Message-ID: <${crypto.randomUUID()}@ozerlabs.com>`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    b64(govde).replace(/(.{76})/g, '$1\r\n'),
  ].join('\r\n')
}

async function contact(request, env) {
  if (request.method !== 'POST') {
    return json({ ok: false, error: 'method' }, 405)
  }

  /* Same-origin dışı gönderimi reddet. Tarayıcı same-origin fetch'te Origin
     başlığını göndermeyebilir; o yüzden "varsa ve bize ait değilse" kuralı. */
  const origin = request.headers.get('origin')
  if (origin && origin !== SITE_ORIGIN) {
    return json({ ok: false, error: 'origin' }, 403)
  }

  if (!(request.headers.get('content-type') || '').includes('application/json')) {
    return json({ ok: false, error: 'content-type' }, 415)
  }

  const ham = await request.text()
  if (ham.length > MAX_BODY) return json({ ok: false, error: 'too-large' }, 413)

  let veri
  try {
    veri = JSON.parse(ham)
  } catch {
    return json({ ok: false, error: 'json' }, 400)
  }

  /* Bal küpü: gerçek ziyaretçiye görünmeyen alan doluysa istek bot'tur.
     Sessizce başarılı dönülür — bot yeniden denemesin, ziyaretçi etkilenmesin. */
  if (tekSatir(veri.company, 200)) return json({ ok: true }, 202)

  const name = tekSatir(veri.name, LIMITS.name)
  const email = tekSatir(veri.email, LIMITS.email)
  const budget = tekSatir(veri.budget, LIMITS.budget)
  const message = String(veri.message ?? '').trim().slice(0, LIMITS.message)

  if (!name || !message || !gecerliEposta(email)) {
    return json({ ok: false, error: 'validation' }, 422)
  }

  const raw = mimeOlustur({
    name,
    email,
    budget,
    message,
    meta: {
      time: new Date().toISOString(),
      page: tekSatir(veri.page, 300) || '-',
    },
  })

  try {
    await env.CONTACT_MAIL.send(new EmailMessage(FROM, TO, raw))
  } catch (err) {
    /* İçeriği loglamıyoruz: mesaj gövdesi ziyaretçinin verisidir. */
    console.error('contact send failed:', err?.message || String(err))
    return json({ ok: false, error: 'send' }, 502)
  }

  return json({ ok: true }, 200)
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url)

    if (pathname === '/api/contact') return contact(request, env)
    if (pathname.startsWith('/api/')) return json({ ok: false, error: 'not-found' }, 404)

    /* /api dışı bir istek buraya düşmemeli; düşerse statik varlığa devret. */
    return env.ASSETS.fetch(request)
  },
}
