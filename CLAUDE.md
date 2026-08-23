# OZER LABS — PROJE ÇALIŞMA STANDARDI

Bu depoda yapılan **her** iş bu dosyaya tabidir. Görev "sadece metni değiştir"
kadar dar olsa bile geçerlidir.

## 0. Önce ne okunur, çelişkide hangisi kazanır

Global kurallar `~/.claude/CLAUDE.md` içindedir ve **burada tekrarlanmaz**:
- Genel Çalışma ve Gerçeklik Standardı (madde 1-25)
- Davranışsal Tasarım ve İkna Standardı (madde 26-30)
- Global Ürün Standardı — Psikoloji · UX · UI · Dönüşüm · Marka (madde 31-39)

**Öncelik:** Gerçeklik (1-25) > Davranışsal Tasarım (26-30) > Global Ürün
Standardı (31-39) > bu dosya. Bu dosya onları **sertleştirir**, gevşetmez.
Çelişkide daha güvenli ve doğrulanabilir olan kural uygulanır.

Oturum hafızası oturumlar arasında taşınmaz. Bu yüzden projenin canlı durumu
`~/.claude/projects/C--Users-halil/memory/ozerlabs-proje-durumu.md` dosyasında
tutulur — **OzerLabs görevine başlamadan önce o dosya okunur**, iş bitince
güncellenir.

## 1. Proje kimliği (2026-08-20'de ölçüldü)

| | |
|---|---|
| Ne | OzerLabs tanıtım + müşteri kazanım sitesi (solo stüdyo, Fransa) |
| Yol | `C:\Users\halil\Ozerlabs` |
| Remote | `github.com/halilozer03-dotcom/Ozerlabs.git` (main) |
| Yığın | React 18 · react-router-dom 7 · Vite 5 · marked (blog) · sharp (marka scripti) |
| Yayın | Cloudflare, `wrangler.toml` → `wild-firefly-6ee1`, SPA fallback, `./dist` |
| Dev sunucu | `ozerlabs-dev` (preview_start ile). Proje içi `.claude/launch.json` 5199 der ama cwd genelde `C:\Users\halil` olduğu için oradaki launch.json okunur; 5199'u BENDIQ tuttuğundan OzerLabs **5200**'e tanımlandı (`cwd` alanıyla) |
| Diller | fr (varsayılan) · en · tr — `src/i18n/translations.js` tek kaynak. Açılış dili ziyaretçinin **ülkesine** göre; kullanıcının açık seçimi `localStorage: ozerlabs-lang-v2` |
| Sayfalar | `/` (yedi bölüm) · `/blog` · `/blog/:slug`; eski slug kalıcı yönlendirmede |
| İletişim | `mailto:` ile — sunucu yok, form verisi hiçbir yere gönderilmez |

Ana sayfa sırası: Hero → TechStrip → Hizmetler → Projeler → Çalışma biçimi →
Kapsam → İletişim → Footer.

## 2. Ticari zincir — her değişiklik bunun bir halkasına dokunur

GÖRÜNÜRLÜK → İLK 5 SANİYEDE NE YAPTIĞIMIZIN ANLAŞILMASI → KANIT (yayında,
çalışan ürün) → BELİRSİZLİĞİN AZALMASI (kapsam + teslim süresi) → DÜŞÜK
SÜRTÜNMELİ İLETİŞİM → 1-2 İŞ GÜNÜ DÖNÜŞ.

Ziyaretçi profili: küçük işletme sahibi (restoran, kuaför, garaj, imalat).
Teknik değil, riskten kaçınır; "kim yapıyor, ne kadar sürer, ne alacağım"
sorularının cevabını arar. Metin ve tasarım bu üç soruya çalışır.

**Karar testi — her değişiklikte:** "Bu değişiklik dikkati, anlamayı, güveni,
karar vermeyi, eyleme geçmeyi veya ticari sonucu gerçekten iyileştiriyor mu?"
Cevap hayırsa, sırf modern/güzel göründüğü için yapılmaz.

## 3. YERLEŞİK KARARLAR — gerekçesiz geri alınmaz

Bunlar bu sitede bilinçli alınmış ve koda gerekçesiyle yazılmış kararlardır.
Yeni bir görev bunlardan birini bozuyorsa **önce nedenini söyle**, sonra dokun.

**Dürüstlük**
- Proje kartlarında durum çipi: `Yayında` / `Tasarım aşamasında`
  (`Projects.jsx`). Tasarım aşamasındaki iş yayındaymış gibi gösterilmez.
- Hero görseli gerçek BENDIQ ekranı; eski uydurma maket pano kaldırıldı
  (`HeroVisual.jsx`).
- Teknoloji şeridi proje `meta` alanlarından türetilir, elle yazılmaz
  (`TechStrip.jsx`).
- Hero güven göstergeleri sitede zaten var olan bilgilerden gelir; yeni ve
  doğrulanamaz iddia eklenmez (`Hero.jsx`).
- **Google puanı göstergesi (2026-08-23):** dördüncü güven göstergesi gerçek
  Google İşletme Profilinden gelir — **5,0 · 6 değerlendirme**, canlı profilden
  ölçüldü. Sayı uydurulmuyor ve ziyaretçi doğrulayabilsin diye profile
  **linkli** veriliyor (`links.js` → `GOOGLE_BUSINESS`). Puan veya sayı
  değişirse `translations.js`'teki `eyebrow.rating` **üç dilde birlikte**
  güncellenir; eski sayı bırakılırsa gösterge yanlış iddiaya dönüşür.
- **Konum "Lyon, France"** (2026-08-23, kullanıcı talimatı). **Açık adres
  hiçbir yere yazılmaz** — ne siteye, ne Google İşletme Profiline, ne sosyal
  hesaplara. GBP bilerek "hizmet bölgesi" işletmesi olarak kurulu: konum alanı
  *"Konum yok, yalnızca teslimat ve evlere yönelik hizmetler"*, yalnızca ülke
  düzeyinde bölge listeli. Bu ayar bozulmamalı.
- Sosyal bağlantılar yalnızca gerçekten var olan hesaplar (`Footer.jsx`).
- Ölçülmemiş sayı yok: "X mutlu müşteri", "%Y dönüşüm", yıldız ortalaması,
  müşteri yorumu — hiçbiri uydurulmaz.

**Dikkat ve tek eylem**
- **CTA metni ile hedefi eşleşmek zorunda.** Metin değiştiğinde hedef de
  kontrol edilir. 08-08'de `ctaPrimary` "Projeleri Gör"den "Ücretsiz Teklif
  Al"a döndü, `Hero.jsx`'teki hash'ler eski kaldı ve birincil buton 12 gün
  boyunca projelere gitti (20-08'de düzeltildi). Bu sınıf hata sessizdir:
  build de, konsol da uyarmaz — yalnızca bağlantıyı okumak yakalar.
- Sayfada birincil buton **iki** tane: hero ve iletişim. Nav CTA'sı ve çekmece
  CTA'sı bunun dışındadır. Kart içi CTA'lar kaldırıldı — aynı çağrı sayfada
  yedi kez geçiyordu (`Services.jsx`, `Pricing.jsx`).
- Blog önizlemesi ana sayfadan kaldırıldı, footer'a indi: ziyaretçiyi
  dönüşümden uzaklaştıran tek bölümdü (`App.jsx`, `Footer.jsx`).
- "En çok tercih edilen" rozeti kaldırıldı: üç seçenekli solo stüdyoda
  popülerlik iddiası inandırıcı değil (`Pricing.jsx`).
- Projeler ızgarası hiyerarşik: kendi ürünümüz büyük, müşteri işleri kompakt.

**Sürtünme**
- Fiyat bölümünün adı "Kapsam". Rakam yok, bu yüzden başlık da fiyat vaat
  etmiyor; her kart "ne alıyorum" + teslim süresi verir (`Pricing.jsx`).
- İletişim formunda bütçe alanı **zorunlu değil** ve ilk seçenek "Henüz
  bilmiyorum" — zorunlu bütçe alanı form terkini yükseltir (`Contact.jsx`).
- Form `mailto:` ile çalışır; kullanıcı verisi sunucuya gitmez.

**Erişilebilirlik (zorunlu, pazarlığa kapalı)**
- Skip link, `:focus-visible` halkaları, `aria-current`, çekmece için
  `role="dialog"` + Escape + odak dönüşü, `prefers-reduced-motion` desteği.
- Dekoratif görsel `alt=""`; kanıt niteliğindeki görselin gerçek alt metni olur.

## 4. İçerik ve metin

**Açılış dili — öncelik sırası (`LanguageContext.jsx`):**
kullanıcının açık seçimi > **ülke** > tarayıcı dili > fr.

- Ülke kendi origin'imizden okunur: Cloudflare her sitede `/cdn-cgi/trace`
  sunar, `loc=XX` satırı ziyaretçinin ülkesini verir. **Üçüncü taraf IP
  servisi kullanılmaz**, ziyaretçinin IP'si dışarı çıkmaz — yeni bir dil
  kaynağı eklenecekse bu sınır korunur.
- Eşleme `COUNTRY_LANG`: TR → tr; FR, BE, CH, LU, MC, MA, DZ, TN → fr;
  listede olmayan her ülke → en. Ülke eklemek bu tablonun tek satırı.
- İlk boyama senkron kalsın diye tarayıcı dili başlangıç değeridir; ülke
  bilgisi ağdan gelince düzeltir. Yerelde `/cdn-cgi/trace` olmadığından tespit
  sessizce atlanır — bu yüzden **ülke davranışı ancak canlıda doğrulanabilir**.
- `localStorage` yalnızca **açık seçimde** yazılır, otomatik tespitte yazılmaz.
  Anahtar `ozerlabs-lang-v2`; eskisi (`ozerlabs-lang`) her açılışta otomatik
  yazıldığı için seçim ile tahmin ayırt edilemiyordu, artık okunmuyor.

- **Üç dil eşzamanlı.** `translations.js` içinde `fr`, `en`, `tr` blokları aynı
  anahtar setini taşır. Bir dile metin ekleyip diğerini eski bırakmak hatadır —
  üçü birlikte güncellenir.
- Varsayılan dil **fr**; hedef pazar Fransa. Türkçe metin "asıl", Fransızca
  "çeviri" değildir; Fransızca birinci sınıf metindir.
- Ton: sakin, net, işini bilen. Abartı, ünlem, "en iyi / lider / devrim" yok.
- Sıra: Clarity > Cleverness · Value > Features · Specificity > Generic ·
  Proof > Promises · Outcome > Jargon.
- Blog yazıları `src/content/blog.js` içinde, dil başına `title/excerpt/content`.
  Yeni yazı → `public/sitemap.xml` güncellenir. Slug değişirse eski slug
  `App.jsx` içinde kalıcı yönlendirmeye bağlanır (paylaşılan linkler kırılmaz).

## 5. UI ve tasarım sistemi

- `src/styles/tokens.css` **tek gerçek kaynak**. Bileşen dosyalarında ham hex
  veya keyfi px yok; renk, boşluk, tipografi, radius, gölge, süre hep token.
- Yüzey ritmi zemin **kademesiyle** kurulur, renk değiştirerek değil:
  `void → base → raise → base → raise → base → void` (`data-surface`).
- Neon mavi üç yerde: birincil buton parıltısı, bölüm hairline'ı,
  hero/iletişim atmosferi. Dördüncü bir yere yayılmaz.
- Camgöbeği (`--data`) aksan değil: yalnızca ölçü, veri ve rakam.
- Birincil buton neon dolgu + **koyu** metin (kontrast 7,2:1). Beyaz metin
  kullanma — 2,7:1'e düşer.
- Yeni bir değer gerekiyorsa önce token ölçeğinde karşılığı aranır; ölçek ancak
  gerçekten gerekiyorsa ve gerekçesiyle genişletilir.

## 6. Performans ve SEO

- Fontlar kendi sunucumuzdan (`src/styles/fonts.css`); üçüncü tarafa istek
  gitmez. Yalnızca iki dosya preload edilir, latin-ext bilerek edilmez.
- Her `<img>` `width`/`height` taşır (CLS). Hero görseli `loading="eager"` +
  `fetchpriority="high"`, geri kalanı `lazy`.
- Ölçülen derleme (2026-08-23): `js 300.73 kB / gzip 100.82 kB`,
  `css 43.39 kB / gzip 8.80 kB`, süre ~0,76 sn. Belirgin artış gerekçe ister.

**Rota başına canonical — 2026-08-23'te kuruldu, bozulmamalı.**
Site tek `dist/index.html` ile sunulduğu için (Cloudflare SPA fallback) her
adres aynı `<head>`'i alıyordu: `/blog` ve `/blog/:slug` ana sayfanın canonical
etiketini taşıyor, Google da onları "Alternate page with proper canonical tag"
sayıp **dizine almıyordu**. 08-08'den 08-23'e kadar blog hiç dizine girmedi.

- `npm run build` = `vite build && node scripts/prerender.mjs`. **Sıra
  zorunlu:** `vite build` her seferinde `dist/`i boşaltır, prerender sonra
  çalışmalı. Betiği tek başına veya önce çalıştırmak çıktıyı sessizce siler.
- `prerender.mjs` taze `dist/index.html`'i kabuk alır ve **yalnızca `<head>`**
  içindeki canonical, og:url, title, description, og:title, og:description,
  twitter:title, twitter:description alanlarını rotaya göre değiştirip
  `dist/blog.html` + `dist/blog/<slug>.html` yazar. **Gövdeye dokunmaz** —
  üç dilin tek URL'de çalışma anında seçilmesi aynen korunur.
- Alt dizin `index.html` değil **kardeş `.html`** yazılır: Cloudflare'in
  varsayılan `html_handling` modu bunları slash'sız adreste 200 ile sunar,
  `/blog/` biçimi 307 ile kanonik biçime döner. Bu yüzden `wrangler.toml`'da
  **`main`, `run_worker_first`, `html_handling` yoktur ve eklenmez** — site
  salt statik varlık sunumu olarak kalır. (Dosyadaki tek ek ayar
  `workers_dev = false`; gerekçesi §11'de.)
- `swapOnce()` her kalıp için **tam bir** eşleşme bekler; sıfır veya birden
  fazla eşleşmede derleme kırılır. `index.html`'in `<head>` şablonu
  değiştirilirse derleme burada durur — sessiz yanlış çıktı üretilmez.
- **`sitemap.xml` artık üretilir**, elle tutulmaz (`public/sitemap.xml` silindi).
  Rota listesi ve sitemap `src/content/blog.js`'ten türer: **yeni yazı eklemek
  için yalnızca `blog.js`'e satır eklenir**, başka hiçbir dosyaya dokunulmaz.
- Adresi değişen yazılar tek kaynakta: `src/content/redirects.js` → `LEGACY_SLUGS`.
  Aynı liste hem `App.jsx`'teki istemci yönlendirmesini hem eski adres için
  kanonik hedefi **yeni** yazıyı gösteren statik sayfayı besler.
- `SITE_TITLE`/`SITE_DESCRIPTION` (`src/content/siteMeta.js`) elle yazılmaz:
  `vite.config.js` bunları derleme anında `index.html`'den okuyup `define` ile
  gömer. Tek kaynak `index.html` kalır, iki yerin ayrışması imkânsızdır.
- `BlogPost.jsx` ve `BlogList.jsx` başlık/açıklamayı çalışma anında değiştirir,
  ayrılırken **sitenin varsayılanına döner** (mount anındaki değere değil —
  o değer artık sayfanın kendi statik başlığıdır ve sekmede kalırdı).
- **Canonical'a JS ile dokunulmaz.** SPA gezinmesinde canonical ilk yüklenen
  sayfanın adresinde kalır; bu bilinçlidir ve crawler için zararsızdır
  (Googlebot istemci gezinmesi yapmaz, her URL'i sıfırdan yükler).
- `hreflang` hâlâ **yok**: ön koşulu dil başına ayrı URL'dir.

## 7. Doğrulama protokolü — "tamam" demeden önce

1. `npm run build` — hata yoksa ve bundle boyutu beklenen aralıktaysa geç.
   Son satır **prerender özetini** yazmalı (`N rota + N eski adres yazıldı,
   sitemap N URL ile üretildi`). Çıkmadıysa prerender çalışmamıştır.
1b. Rota/SEO'ya dokunan her değişiklikte, deploy sonrası **canonical ölçülür**:
   ```
   for p in / /blog /blog/bendiq-hikayesi; do printf "%-45s " "$p"; \
     curl -s "https://ozerlabs.com$p" | grep -o 'rel="canonical" href="[^"]*"'; done
   ```
   Her satır **kendi adresini** yazmalı ve sayfa başına **tam 1** canonical
   olmalı. Deploy hemen sonrası edge önbelleği birkaç dakika eski sürümü
   sunabilir (ölçüldü) — karışık sonuç görülürse ölçüm birkaç dakika sonra
   tekrarlanır, `?cb=<rastgele>` ile gerçek dosya doğrudan kontrol edilebilir.
2. `preview_start` → `ozerlabs-dev` (port 5199). Bash ile sunucu başlatma.
3. `read_console_messages` (hata var mı) + `read_page` (içerik ve yapı).
4. **Üç dilde** kontrol: fr, en, tr. Dil düğmesiyle geçilir.
5. Etkileşim değiştiyse: çekmece aç/kapa, Escape, form gönderimi.
6. `resize_window` **kullanma** — cihaz öykünmesi açıp hayalet görüntü
   üretiyor; responsive bakılacaksa sekme yeniden açılır.
7. Görsel değişiklikte ekran görüntüsü ile kanıtla.

Test edilmediyse "doğrulandı" denmez. Ölçülmediyse "hızlandı / iyileşti /
dönüşüm arttı" denmez.

## 8. Yasak

- Dark pattern: sahte kıtlık, sahte sosyal kanıt, sahte aciliyet, gizli
  maliyet, confirmshaming, reddetme yolunu gizleme, yanıltıcı buton hiyerarşisi.
- Uydurma müşteri sayısı, yorum, referans, istatistik, rozet, ödül.
- Tasarım aşamasındaki işi yayında göstermek.
- Kanıtsız üstünlük iddiası ("en iyi", "Fransa'nın lider stüdyosu").
- Bir dili güncelleyip diğer ikisini geride bırakmak.
- İstenmeyen kapsam genişletmesi: görev "metni değiştir" ise tasarım sistemi
  yeniden yazılmaz.

## 9. Bu depoda yapılmış işler (commit geçmişinden, 2026-08-20'de çıkarıldı)

Depo 2026-07-13'te açıldı. Claude ortak yazarlı dört commit var; geri kalanı
aynı çalışma akışının parçası.

- **07-13 → 07-20:** İlk sürüm, portföy kartları (HD Auto, Maison Fairouz,
  Prod Metal), blog altyapısı ve üç yazının FR/EN/TR çevirisi, sitemap.
- **07-30:** ÖZER BEND PRO gizlilik politikası sayfası (`ozer-bend-privacy/`,
  Play Store için — ayrı içerik, sitenin tasarım sistemine dahil değil).
- **08-07:** Yürük Hukuk projesi portföye eklendi.
- **08-08 — büyük yeniden tasarım** (`755bbbb`, 42 dosya, +4384/-991): koyu
  yüzey + neon mavi kimlik, yedi bölüm, token sistemi (`tokens.css`), CSS üç
  dosyaya bölündü, `Process` bölümü `About` içine katlandı,
  `TechStrip`/`SectionHead`/`Logo`/`Icon`/`HeroVisual` eklendi,
  `useScrollState` hook'u.
- **08-08:** Blog sayfaları + SEO + paylaşım görseli; proje durumları
  dürüstleştirildi (yayında / tasarım aşamasında); gerçek OL logosu, yerel
  marka görselleri ve gömülü fontlar (`prep-brand-assets.mjs`); marka işareti
  vektörel yeniden çizim değil logonun kendisi; hero görseli Play sayfasına
  bağlandı (`links.js`).
- **08-15 (commit edilmedi):** BENDIQ kapak ve hero görseli yenilendi (A4 yatay
  teknik çizim), görsel oranları gerçek ölçüye çekildi (720×1560 ve 1020×600),
  BENDIQ açıklaması üç dilde güncellendi (2D/3D/4D + delik yerleşimi + PDF +
  25 dil), `og-image.jpg` küçültüldü, `sections.css` buna göre düzenlendi.

İlgili oturumlar (transkriptleri sistem tarafından silinmiş, yalnızca başlıkları
kaldı): "OzerLabs UI/UX Profesyonel Yeniden Tasarım" (08-07), "OzerLabs tasarım
yenileme" (08-08), "Ozerlabs kartlarını güncelle" (08-09), "Bendiq özerlabs
görüntüsü ve açıklaması" (08-15).

- **08-20 — standart bu dosyaya yazıldı ve uygulandı.** Üç düzeltme:
  (1) hero CTA'larının hedefleri metinle eşleştirildi — birincil buton artık
  `#iletisim`, ikincil `#projeler`, ikincilin ikonu `message-circle` yerine
  `layers`; (2) Kapsam kartlarında fr/en üçer madde taşırken tr dördü
  taşıyordu — eksik üç madde (yayına alma + alan adı, gerçek cihazda test,
  hesap doğruluğu testle kanıtlı) fr ve en'e eklendi; (3) `index.html` FR'ye
  çevrildi (`lang`, title, description, keywords, OG/Twitter, `og:locale`
  fr_FR + alternate, JSON-LD `availableLanguage`).

- **08-20 — açılış dili ülkeye bağlandı** (`7ed1c75`). Canlıda doğrulandı:
  tarayıcı dili `tr`, ülke FR → site Fransızca açıldı; sonra TR seçilip
  yenilenince seçim korundu.

## 10. Açık durum (2026-08-20 ölçümü)

- **Her şey yayında (2026-08-20).** İki commit (`5ee7076` BENDIQ görselleri,
  `537f583` CTA + dil + meta + bu dosya) main'e gönderildi ve Cloudflare'e
  deploy edildi (Version `91171a29`). `ozerlabs.com` ve
  `wild-firefly-6ee1.halilozer03.workers.dev` ikisi de güncel içeriği sunuyor,
  canlıda okunarak doğrulandı. Çalışma dizini temiz.
- **Dil değişince `<title>` ve `<meta description>` güncellenmiyor.** Statik
  HTML'den geliyor; `LanguageContext` yalnızca `documentElement.lang` yazıyor.
  TR'ye geçen ziyaretçinin sekmesinde Fransızca başlık kalıyor. `BlogPost.jsx`
  başlığı kendi yönettiği için düzeltme oraya dikkat etmeli (mount'ta
  `prevTitle` saklıyor, unmount'ta geri koyuyor) — çakışmadan çözülmeli.
- `hreflang` **bilinçli olarak yok**: üç dil tek URL'de sunuluyor, ayrı adres
  olmadan hreflang yanlış sinyal olur. Dil başına URL'ye geçilirse eklenir.
- Bunlar **tespit**tir; kullanıcı istemeden düzeltme yapılmaz.

## 11. Canonical/indeksleme düzeltmesi (2026-08-23) — durum

**ÇÖZÜLDÜ ve canlıda ölçüldü.** Google Search Console "Doğru standart etikete
sahip alternatif sayfa" uyarısının kök nedeni bulundu (sabit canonical, §6) ve
prerender ile giderildi. Commit `68779d3`, Cloudflare sürümü `451af771`.
Canlı ölçüm: 5 rotanın 5'i 200 + kendi doğru canonical'ı (n=1); eski slug
`/blog/ozer-bend-pro-hikayesi` yeni yazıyı kanonik gösteriyor; `/blog/` 307 →
`/blog`; sitemap 5 URL; bilinmeyen rotalar hâlâ SPA fallback (gerileme yok).

**`www` → apex 301: KURULDU (2026-08-23), canlıda ölçüldü.**
Cloudflare Dashboard → ozerlabs.com → Rules → Redirect Rules, "Redirect from
WWW to root" şablonundan. Kural adı `Redirect from WWW to root [Template]`,
sıra 1, **Active**. Desen `https://www.*` → hedef `https://${1}`, durum **301**,
**Preserve query string AÇIK** (şablon bunu varsayılan olarak kapalı getiriyor —
açılmazsa `?utm_source=...` gibi parametreler kaybolur, elle işaretlendi).
Ölçüm: `www.ozerlabs.com/blog` → 301 → `https://ozerlabs.com/blog` (tek hop),
query string aynen korunuyor, apex istekleri **etkilenmedi** (200).
**Tuzak:** Deploy sırasında Cloudflare *"This rule may not apply to your traffic
— DNS may not be proxying www"* uyarısı verir. Bu uyarı bu zone için **yanlış**
çıktı; "Ignore and deploy rule anyway" ile kuruldu ve gerçek istekle 301
doğrulandı. Uyarıya bakıp DNS kaydı oluşturmaya gerek yok.
Not: bu iş için ayrı bir redirect Worker'ı da yazılmıştı; panel yolu çalışınca
gereksiz kaldı ve silindi. wrangler OAuth token'ında **zone yazma yetkisi yok**
(yalnızca workers kapsamları), o yüzden Redirect Rules API ile kurulamaz.

**`workers.dev` ikizi: KAPATILDI (2026-08-23), canlıda ölçüldü.**
`wild-firefly-6ee1.halilozer03.workers.dev` aynı içeriği ikinci bir adreste
taranabilir halde sunuyordu. Çözüm **panelden değil koddan**: `wrangler.toml`'a
`workers_dev = false` eklendi — salt varlık sunan (`main` alanı olmayan) bir
yapılandırmada bu anahtar **kabul ediliyor** (ölçüldü). Kod yolu seçildi çünkü
panelden kapatılan rota bir sonraki `wrangler deploy` ile yeniden açılabilir.
Ölçüm: workers.dev üzerinde `/`, `/blog`, `/sitemap.xml` → **404**;
`ozerlabs.com` **etkilenmedi** (5/5 canonical doğru, statik varlıklar 200).
`workers.dev/robots.txt` hâlâ 200 döner ama o **bizim dosyamız değildir** —
Cloudflare'in platform seviyesi içerik-sinyali metnidir; bizim `Allow: /` +
sitemap satırımız orada yoktur.
**İki beklenen çıktı, ikisi de normal:** (1) deploy `No targets deployed for
wild-firefly-6ee1` yazar — bu yalnızca workers.dev tetikleyicisinin kalktığını
söyler, özel alan adı (ozerlabs.com) etkilenmez, **site ayaktadır**;
(2) `Preview URLs will be disabled` uyarısı gelir — bu projede önizleme URL'si
kullanılmıyor, isteniyorsa `preview_urls = true` ile geri açılır.

**Kullanıcı kararı bekleyen tek iş:**
1. **GSC "Düzeltmeyi doğrula"** — panel işi. Ölçüt: yukarıdaki curl çıktısı
   5/5 doğru gelmeden **basılmaz**; erken basılırsa Google ilk örneklemede
   sorunu görüp doğrulamayı anında başarısıza düşürür.

**Bu düzeltmenin kapsamadığı (ayrı konular):** üç dilin tek URL'de kalması
çokdilli görünürlüğü çözmez — Googlebot yalnızca kendi IP'sine düşen tek dil
varyantını görür. JSON-LD bloğu her rotada aynı kalır (blog yazısı için
`BlogPosting` olmalıydı) — bugüne göre gerileme değil, bilinçli kapsam dışı.
`ozer-bend-privacy/index.html` depoda var ama `dist/`e girmiyor; ozerlabs.com
üzerindeki o adres SPA fallback'e düşüyor (Play Store'daki gerçek link GitHub
Pages'i gösteriyor, bu yüzden acil değil).
