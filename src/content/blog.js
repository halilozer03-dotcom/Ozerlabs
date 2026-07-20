export const posts = [
  {
    slug: 'ozer-bend-pro-hikayesi',
    date: '2026-07-20',
    fr: {
      title: "L'histoire d'ÖZER BEND PRO : une app de calcul de pliage de tôle",
      excerpt: "D'un tableur de calcul manuel à une application Android complète avec aperçu 3D — comment est né ÖZER BEND PRO, et pourquoi construire un produit soi-même reste un pari qui vaut le coup.",
      content: `
Tous les projets chez Ozer Labs ne sont pas des sites pour des clients. **ÖZER BEND PRO** est un produit propre, né d'un besoin concret : les professionnels du pliage de tôle calculent encore souvent leurs facteurs K et leurs développés à la main ou sur un tableur approximatif.

## Le problème de départ

Le facteur K et la longueur développée sont essentiels pour plier une tôle avec précision — une erreur de calcul se traduit directement par une pièce défectueuse. Les calculatrices génériques ne tiennent pas compte des spécificités machine (angle, épaisseur, rayon d'outil), et les tableurs faits maison sont difficiles à partager ou à faire évoluer.

## Ce que fait l'application

ÖZER BEND PRO calcule le facteur K et le développé à partir de données machine réelles, propose un aperçu 3D en temps réel du profil plié, et génère un PDF prêt à partager avec l'atelier ou le client. Tout depuis un téléphone Android, sans tableur ni calcul manuel.

## Un modèle freemium pensé pour l'essai réel

- 7 jours d'essai complet
- Puis un palier gratuit : 3 PDF par jour, sans logo personnalisé, sans aperçu 3D
- Version Pro à 9,99 € en achat unique, sans abonnement

## Pourquoi construire un produit, pas seulement des sites

Développer ÖZER BEND PRO en parallèle des sites clients a demandé une infrastructure différente : CI/CD via GitHub Actions, build et signature automatiques, gestion de licence via Supabase, publication sur Google Play. C'est plus de travail qu'un site vitrine — mais un produit continue de générer de la valeur sans qu'on reparte de zéro à chaque nouveau client.

## Et maintenant ?

L'application est actuellement en alpha fermée sur Google Play (177 pays, phase de test), avec un passage en production prévu très prochainement. La suite : plus de retours utilisateurs, plus d'itérations, et peut-être un jour d'autres outils du même genre pour d'autres métiers techniques.
`.trim(),
    },
    en: {
      title: "The Story of ÖZER BEND PRO: A Sheet Metal Bending Calculator App",
      excerpt: "From manual calculations on a rough spreadsheet to a full Android app with 3D preview — how ÖZER BEND PRO came to be, and why building your own product is a bet worth making.",
      content: `
Not every project at Ozer Labs is a client site. **ÖZER BEND PRO** is an in-house product, born from a real problem: sheet metal bending professionals often still calculate K-factors and flat-pattern lengths by hand or on a rough spreadsheet.

## The starting problem

K-factor and developed length are essential for bending sheet metal precisely — a miscalculation translates directly into a defective part. Generic calculators don't account for machine-specific details (angle, thickness, tool radius), and homemade spreadsheets are hard to share or scale.

## What the app does

ÖZER BEND PRO calculates K-factor and developed length from real machine data, shows a live 3D preview of the bent profile, and generates a PDF ready to share with the shop floor or a client. All from an Android phone, no spreadsheet or manual math required.

## A freemium model built for real trial

- 7-day full trial
- Then a free tier: 3 PDFs/day, no custom logo, no 3D view
- One-time Pro purchase for €9.99, no subscription

## Why build a product, not just websites

Building ÖZER BEND PRO alongside client sites required different infrastructure: CI/CD via GitHub Actions, automatic build and signing, license management through Supabase, publishing to Google Play. It's more upfront work than a showcase site — but a product keeps generating value without starting from scratch for every new client.

## What's next

The app is currently in closed alpha on Google Play (177 countries, testing phase), with a move to production coming very soon. Next up: more user feedback, more iteration, and maybe one day other tools like it for other technical trades.
`.trim(),
    },
    tr: {
      title: 'Sac Bükme Hesaplama Uygulaması: ÖZER BEND PRO Hikayesi',
      excerpt: 'Elle yapılan hesaplardan 3D önizlemeli tam bir Android uygulamasına — ÖZER BEND PRO nasıl doğdu ve kendi ürününü inşa etmek neden değerli bir bahis?',
      content: `
Ozer Labs'ta her proje bir müşteri sitesi değil. **ÖZER BEND PRO**, gerçek bir ihtiyaçtan doğan kendi ürünümüz: sac büküm profesyonelleri hâlâ çoğu zaman K-faktörünü ve açınım uzunluğunu elle ya da gelişigüzel bir excel tablosunda hesaplıyor.

## Başlangıçtaki Problem

K-faktörü ve açınım uzunluğu, sacı doğru bükmek için kritik öneme sahip — bir hesap hatası doğrudan hatalı parçaya dönüşür. Genel amaçlı hesap makineleri makineye özgü detayları (açı, kalınlık, takım yarıçapı) hesaba katmaz, ev yapımı excel tabloları ise paylaşımı ve büyütülmesi zor araçlardır.

## Uygulama Ne Yapıyor?

ÖZER BEND PRO, gerçek makine verilerinden K-faktörü ve açınım uzunluğunu hesaplıyor, bükülmüş profilin canlı 3D önizlemesini gösteriyor ve atölyeyle ya da müşteriyle paylaşılmaya hazır bir PDF üretiyor. Hepsi bir Android telefondan, excel ya da elle hesaplama olmadan.

## Gerçek Denemeye Uygun Freemium Model

- 7 günlük tam deneme
- Ardından ücretsiz katman: günde 3 PDF, özel logo yok, 3D görünüm yok
- Tek seferlik 9,99€ ile Pro sürüm, abonelik yok

## Neden Sadece Site Değil, Ürün İnşa Etmek?

ÖZER BEND PRO'yu müşteri siteleriyle paralel geliştirmek farklı bir altyapı gerektirdi: GitHub Actions üzerinden CI/CD, otomatik build ve imzalama, Supabase üzerinden lisans yönetimi, Google Play'e yayınlama. Bir vitrin sitesinden daha fazla ön emek — ama bir ürün, her yeni müşteride sıfırdan başlamadan değer üretmeye devam ediyor.

## Sırada Ne Var?

Uygulama şu anda Google Play'de kapalı alfa aşamasında (177 ülke, test süreci), çok yakında production'a geçiş planlanıyor. Sıradaki adımlar: daha fazla kullanıcı geri bildirimi, daha fazla iterasyon, ve belki bir gün başka teknik meslekler için benzer araçlar.
`.trim(),
    },
  },
  {
    slug: 'kucuk-isletmeler-icin-google-business-profile-rehberi',
    date: '2026-07-20',
    fr: {
      title: 'Guide Google Business Profile pour les petites entreprises',
      excerpt: "Pour apparaître sur Google Maps et dans les résultats de recherche locaux, la première étape n'est pas un site web, mais Google Business Profile. Comment le configurer, à quoi faire attention ?",
      content: `
Quand on recherche "garage auto à Bourgoin-Jallieu" ou "pâtisserie près de moi", ce qui apparaît sur la carte, le nom de l'entreprise, la note et les avis viennent tous d'une seule source : **Google Business Profile** (anciennement Google My Business). Même avec un site web, sans ce profil il est presque impossible d'apparaître dans les recherches locales.

## Google Business Profile, quelle différence avec un site web ?

Votre site web est ce que les gens voient quand ils vous recherchent consciemment. Le Business Profile, lui, est intégré directement par Google dans les résultats de recherche et la carte — vous apparaissez même pour des recherches génériques comme "près de moi". Les deux se complètent, l'un ne remplace pas l'autre.

## Étapes de configuration

1. Se connecter sur **business.google.com** avec le compte Google du propriétaire de l'entreprise — pas celui d'une agence ou d'un consultant, pour que la propriété reste entre ses mains.
2. Renseigner le nom, la catégorie (ex. "Garage automobile", "Restaurant") et l'adresse.
3. Une étape de vérification suit — généralement un code envoyé par courrier, parfois par téléphone ou vidéo.
4. Une fois vérifié, le profil devient actif et modifiable.

## Les détails qui renforcent le profil

- **Horaires** à jour, notamment pendant les jours fériés.
- **Photos** régulièrement ajoutées : façade, intérieur, produits ou services.
- **Répondre aux avis** — positifs comme négatifs — signale à Google une entreprise active.
- **Choix de catégorie** précis : une catégorie trop générique nuit à votre visibilité sur les bonnes recherches.

## Le lien avec votre site web

Le lien vers votre site ajouté au profil signale à Google que le site et l'entreprise sont liés, ce qui renforce la crédibilité SEO du site. Penser les deux ensemble est bien plus efficace que les traiter séparément.

## En résumé

Un site web sans Business Profile, c'est rester invisible pour une grande partie de vos clients potentiels. Ensemble, ils forment une présence numérique complète : confiance et visibilité locale.
`.trim(),
    },
    en: {
      title: 'Google Business Profile Guide for Small Businesses',
      excerpt: "If you want to show up on Google Maps and in local search results, the first step isn't a website — it's Google Business Profile. How do you set it up, and what should you watch for?",
      content: `
When someone searches "auto garage near me" or "bakery near me", what shows up on the map — business name, star rating, reviews — all comes from one source: **Google Business Profile** (formerly Google My Business). Even with a website, without this profile it's nearly impossible to show up in local search.

## What's the difference from a website?

Your website is what people see when they deliberately search for you. Business Profile is embedded directly into Google's search results and map — you show up even for generic searches like "near me". The two complement each other; neither replaces the other.

## Setup steps

1. Sign in at **business.google.com** with the business owner's own Google account — not an agency's or consultant's — so ownership stays with the business.
2. Enter the business name, category (e.g. "Auto Repair Shop", "Restaurant"), and address.
3. A verification step follows — usually a postal code, sometimes phone or video verification.
4. Once verified, the profile goes live and becomes editable.

## Details that strengthen the profile

- **Hours** kept accurate, especially around holidays.
- **Photos** added regularly: storefront, interior, products or services.
- **Responding to reviews** — both positive and negative — signals an active business to Google.
- **Precise category** selection: a category that's too generic hurts visibility for the right searches.

## The link to your website

Adding your website link to the profile signals to Google that the site and the business are the same entity, which strengthens the site's SEO credibility. Thinking of both together is far more effective than treating them separately.

## Bottom line

A website without a Business Profile means staying invisible to a large share of your potential customers. Together, they form a complete digital presence: trust plus local visibility.
`.trim(),
    },
    tr: {
      title: 'Küçük İşletmeler İçin Google Business Profile Rehberi',
      excerpt: "Google'da arandığınızda haritada ve arama sonuçlarında çıkmak istiyorsanız, ilk adım bir web sitesi değil — Google Business Profile'dır. Nasıl kurulur, neye dikkat etmeli?",
      content: `
"Bourgoin-Jallieu'de oto tamirci" ya da "yakınımdaki kebapçı" diye arama yaptığınızda karşınıza çıkan harita, işletme adı, yıldızlı puan ve yorumlar — hepsi tek bir kaynaktan geliyor: **Google Business Profile** (eski adıyla Google My Business). Bir web siteniz olsa bile, bu profil olmadan yerel aramalarda görünmeniz neredeyse imkansız.

## Google Business Profile Nedir, Web Sitesinden Farkı Ne?

Web siteniz, insanların bilinçli olarak sizi arayıp tıkladığında gördüğü yerdir. Business Profile ise Google'ın kendisi tarafından, arama sonucunun ve haritanın içine gömülü olarak gösterilir — insanlar sizi aramasa bile "yakınımda X" gibi genel aramalarda karşılarına çıkarsınız. İkisi birbirini tamamlar, biri diğerinin yerine geçmez.

## Kurulum Adımları

1. **business.google.com** adresine işletme sahibinin kendi Google hesabıyla girilir. Mülkiyetin işletmede kalması için bu adımı işletme sahibinin kendi hesabıyla yapması önemlidir — ajans veya danışman hesabıyla değil.
2. İşletme adı, kategori (ör. "Oto Tamirci", "Restoran") ve adres girilir.
3. Doğrulama adımı gelir — genellikle posta yoluyla bir kod gönderilir, bazı durumlarda telefon veya video doğrulaması da sunulur.
4. Doğrulama tamamlanınca profil canlıya çıkar ve düzenlenebilir hale gelir.

## Profili Güçlü Tutan Detaylar

- **Çalışma saatleri** güncel ve doğru olmalı — özellikle tatil günlerinde güncellemeyi unutmayın.
- **Fotoğraflar** düzenli eklenmeli: dış cephe, iç mekan, ürün/hizmet fotoğrafları.
- **Yorumlara yanıt verin** — hem olumlu hem olumsuz yorumlara kısa, profesyonel yanıtlar Google'ın gözünde de aktif bir işletme sinyali oluşturur.
- **Kategori seçimi** kritik: yanlış veya çok genel bir kategori, doğru aramalarda çıkmamanıza sebep olur.

## Web Siteniz ile Bağlantı

Business Profile'a eklediğiniz web sitesi linki, hem kullanıcıyı sitenize yönlendirir hem de Google'a "bu web sitesi ile bu işletme aynı yer" sinyalini verir — bu da SEO açısından web sitenizin güvenilirliğini artırır.

## Özet

Bir web siteniz varsa ama Business Profile'ınız yoksa, potansiyel müşterilerinizin büyük kısmına hâlâ görünmüyorsunuz demektir. İkisi birlikte, hem güven inşa eden hem de yerel aramada bulunmanızı sağlayan tam bir dijital varlık oluşturur.
`.trim(),
    },
  },
  {
    slug: 'restoran-web-sitesi-mi-siparis-sistemi-mi',
    date: '2026-07-20',
    fr: {
      title: 'Site web ou système de commande pour votre restaurant ?',
      excerpt: "Les deux options ne se remplacent pas — elles répondent à des besoins différents. Clarifions la différence avant de choisir ce qui convient à votre établissement.",
      content: `
Si vous gérez un restaurant, un kebab ou un café, la même question revient toujours : "Nous faut-il juste un site web, ou un système de commande en ligne ?" Ces deux options ne se remplacent pas — elles répondent à des besoins différents. Clarifions la différence avant de décider.

## Le site web : votre vitrine

Un site web classique est la carte d'identité numérique de votre entreprise. Il montre votre menu, votre adresse, vos horaires et vos coordonnées. C'est le premier point de contact qui répond à la question "cet endroit est-il fiable ?".

Un site web suffit si :
- Vous prenez encore les commandes par téléphone ou sur place
- Votre objectif principal est la visibilité et la confiance
- Vous voulez apparaître dans les recherches locales avec Google Business Profile

Mais un site web seul ne peut pas prendre de commande, traiter un paiement, ni notifier la cuisine.

## Le système de commande (SaaS) : votre opération

Le système de commande couvre l'arrière-plan de l'activité. Le client choisit dans le menu, personnalise sa commande, finalise le paiement, et la commande arrive directement en cuisine ou dans le panel de gestion. Pour le propriétaire, cela veut dire gain de temps et moins d'erreurs — les malentendus des commandes téléphoniques disparaissent.

Un système de commande a du sens si :
- Le volume d'appels aux heures de pointe alourdit la charge de travail
- Votre menu comporte de nombreux produits personnalisables
- Vous voulez suivre vos données de vente (produit le plus vendu, heures de pointe)

## Les deux ensemble, souvent la bonne réponse

Pour la plupart des entreprises, la bonne réponse est la combinaison des deux : un site qui trouve le client + un système qui traite la commande. **OZER ORDER**, développé pour Le Volkan, est né exactement de ce besoin — le restaurant avait déjà un site, puis la complexité du menu (7 catégories, 27 produits, étapes de personnalisation) a rendu nécessaire la digitalisation des commandes.

## Par où commencer ?

Si vous n'avez pas encore de site web, c'est toujours la première étape — sans confiance ni visibilité, un système de commande seul ne sert à rien. Si vous avez déjà un site et que le volume de commandes pèse sur votre organisation, il est peut-être temps de passer au système de commande.

Dans les deux cas, le principe reste le même : adapter la technologie à votre activité, pas l'inverse.
`.trim(),
    },
    en: {
      title: 'Website or Order System for Your Restaurant?',
      excerpt: "The two options don't replace each other — they answer different needs. Let's clarify the difference before deciding what fits your business.",
      content: `
If you run a restaurant, a kebab shop, or a café, the same question keeps coming up: "Do we just need a website, or an online ordering system?" These two options don't replace each other — they answer different needs. Let's clarify the difference before deciding.

## The website: your storefront

A classic website is your business's digital ID card. It shows your menu, location, hours, and contact details. It's the first touchpoint that answers "is this place trustworthy?"

A website is enough if:
- You still take orders by phone or in person
- Your main goal is visibility and trust
- You want to show up in local search alongside Google Business Profile

But a website alone can't take an order, process payment, or notify the kitchen.

## The order system (SaaS): your operations

An order system covers the operational backend. The customer picks from the menu, customizes the order, completes payment, and the order lands directly in the kitchen or admin panel. For the owner, that means time saved and fewer errors — the mix-ups common with phone orders disappear.

An order system makes sense if:
- Phone traffic during peak hours is overwhelming your staff
- Your menu has many customizable items
- You want to track order data — best-sellers, peak hours

## Often, the answer is both

For most businesses, the right answer is combining both: a site that finds the customer + a system that processes the order. **OZER ORDER**, built for Le Volkan, came from exactly this need — the restaurant already had a website, then the menu grew more complex (7 categories, 27 products, customization steps), making order digitization necessary.

## Where to start

If you don't have a website yet, that's always step one — without trust and visibility, an order system alone won't help. If you already have a site and order volume is straining your operations, it may be time to move to an order system.

Either way, the principle stays the same: shape the technology around your business, not the other way around.
`.trim(),
    },
    tr: {
      title: 'Restoran İçin Web Sitesi mi, Yoksa Sipariş Sistemi mi?',
      excerpt: 'İki seçenek birbirinin yerine geçmez — farklı ihtiyaçlara cevap verir. Hangisinin işletmenize uygun olduğuna karar vermeden önce farkı netleştirelim.',
      content: `
Bir restoran, kebapçı ya da kafe işletiyorsanız, dijitalleşme konusunda karşınıza hep aynı soru çıkar: "Bize sadece bir web sitesi mi lazım, yoksa online sipariş alabileceğimiz bir sistem mi?" Bu iki seçenek birbirinin yerine geçmez — farklı ihtiyaçlara cevap verir. Hangisinin size uygun olduğuna karar vermeden önce farkı netleştirelim.

## Web Sitesi: Vitrininiz

Klasik bir web sitesi, işletmenizin dijital kimlik kartıdır. Menünüzü, konumunuzu, çalışma saatlerinizi ve iletişim bilgilerinizi gösterir. Google'da arandığınızda karşınıza çıkan, müşterinin "bu yer güvenilir mi" sorusuna cevap veren ilk temas noktasıdır.

Bir web sitesi şu durumlarda yeterlidir:
- Siparişleri hâlâ telefonla veya yerinde alıyorsanız
- Asıl hedefiniz görünürlük ve güven inşa etmekse
- Google Business Profile ile birlikte yerel aramalarda çıkmak istiyorsanız

Ama web sitesi tek başına sipariş alamaz, ödeme işleyemez, mutfağa bildirim göndermez.

## Sipariş Sistemi (SaaS): Operasyonunuz

Sipariş sistemi ise işin arka planını da kapsar. Müşteri menüden seçim yapar, siparişi özelleştirir, ödemeyi tamamlar ve sipariş doğrudan mutfağa ya da yönetim paneline düşer. İşletme sahibi için bu, hem zaman kazancı hem de hata payının azalması demektir.

Bir sipariş sistemi şu durumlarda anlamlıdır:
- Yoğun saatlerde telefon trafiği iş yükünü artırıyorsa
- Menünüzde çok sayıda özelleştirilebilir ürün varsa
- Sipariş verilerini takip etmek istiyorsanız

## İkisi Birlikte de Olabilir

Aslında çoğu işletme için doğru cevap ikisinin birleşimidir: müşteriyi bulan bir web sitesi + siparişi işleyen bir sistem. Örneğin Le Volkan için geliştirdiğimiz **OZER ORDER**, tam olarak bu ihtiyaçtan doğdu — restoranın önce web sitesi vardı, sonra menü karmaşıklaştıkça (7 kategori, 27 ürün, özelleştirme adımları) sipariş sürecini dijitalleştirmek gerekti.

## Nereden Başlamalı?

Eğer henüz bir web siteniz yoksa, ilk adım her zaman odur. Web siteniz varsa ve sipariş yoğunluğu operasyonu zorluyorsa, o zaman sipariş sistemine geçmenin zamanı gelmiş olabilir.

Her iki durumda da işin özü aynı: teknolojiyi işinize göre şekillendirmek, işinizi teknolojiye göre değil.
`.trim(),
    },
  },
]
