/* Dışarı çıkan sabit adresler tek yerde.
   BENDIQ'in Play adresi hem hero görselinde hem üç dilin proje
   kartında geçiyor; kopyalanınca biri güncellenip diğerleri
   eskiyordu. */

export const PLAY_BENDIQ = 'https://play.google.com/store/apps/details?id=com.ozer.bendpro'

/* Google İşletme Profili — hero'daki puan göstergesi buraya bağlanır.
   Ziyaretçi puanı kendi gözüyle doğrulayabilsin diye gösterilen her
   değerlendirme sayısı bu adrese linklidir. Profil "hizmet bölgesi"
   işletmesi olarak kurulu: açık adres yayınlanmıyor, yalnızca bölge. */
export const GOOGLE_BUSINESS = 'https://www.google.com/maps?cid=10048536742443227154'

/* İletişim adresi tek kaynak: footer'daki mailto ikonu, Contact.jsx'teki
   form yedeği ve index.html'deki JSON-LD "email" alanı aynı adresi
   göstermek zorunda. Adres değişirse üçü birlikte güncellenir. */
export const CONTACT_EMAIL = 'ozer.labs@gmail.com'

/* Marka profilleri tek kaynak.

   Aynı liste iki yerde yaşıyordu: Footer.jsx'teki SOCIAL_LINKS ve
   index.html'deki JSON-LD sameAs. Biri güncellenip diğeri unutulduğunda
   ne derleme ne konsol uyarır — Google'a sayfada görünmeyen (ya da
   sayfada görünüp Google'ın bilmediği) bir profil bildirilmiş olur.
   prerender.mjs'teki 7. denetim bu iki tarafı karşılaştırır.

   entity: profilin gerçekten temsil ettiği varlık. Hesapların hepsi bize
   ait ama hepsi aynı şeyi temsil etmiyor — Facebook sayfası ve X hesabı
   ürünün (BENDIQ) adına, diğerleri stüdyonun adına. JSON-LD'de her profil
   kendi varlığının altına yazılır; hepsini stüdyonun sameAs'ine koymak
   Google'a yanlış kimlik bildirmek olurdu.

   footer: false olan profil sitede gösterilmez ama gerçek ve bize aittir
   (Play geliştirici sayfası); yapısal veride yerini alır. */
export const SOCIAL_PROFILES = [
  { entity: 'studio', icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/halil-%C3%B6zer-97b21a310', footer: true },
  { entity: 'studio', icon: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@Ozerlabs', footer: true },
  { entity: 'bendiq', icon: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61593729627340', footer: true },
  { entity: 'bendiq', icon: 'x', label: 'X', href: 'https://x.com/bendiq_', footer: true },
  { entity: 'studio', label: 'Google Play', href: 'https://play.google.com/store/apps/developer?id=OzerLabs', footer: false },
]
