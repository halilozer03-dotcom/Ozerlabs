/* BENDIQ tanıtım sayfası (/bendiq) — metin ve medya tek kaynak.

   Her iddia ürün kaynağından doğrulandı (2026-10-25):
   - Android: Play mağaza girişi ozer-bend-pro1/store/listing/<dil>.md
     (7 gün deneme kartsız, ücretsiz mod günde 3 parça, 621 katalog takımı,
     DXF R12, 1:1 şablon, 16 dil). Play sayfası canlı (200).
   - Windows (13.11.2026 yeniden ölçüldü): Microsoft Store canlı ürün verisi
     (What's New = 1.1.35; açıklamada "Essai gratuit de 3 jours … sans carte" +
     "voyez une fois gratuitement le résultat d'une pièce", "Pack atelier :
     1 ordinateur + 1 téléphone"). Yeni arayüz 1.1.33'ten beri: üstte komut
     çubuğu, solda ölçüler, ortada teknik resim, sağda sonuç + çıktılar.
     Görsel public/bendiq/<dil>/win.webp: gerçek Electron kabuğu (bendiq-win
     desktop + 1.1.33 renderer, test sunucusu), dile göre çekildi, alttaki
     durum çubuğu (sürüm yazısı) kırpıldı. 1.1.36 maddesi mağazada canlı
     görüldükten sonra eklendi (14.11.2026).
   - iPhone / iPad (13.11.2026 yayına girdi, kullanıcı): App Store YOK, PWA —
     app.ozerlabs.com (canlı 200, manifest standalone, ad BENDIQ). Safari →
     Paylaş → Ana Ekrana Ekle (iOS 26'da "•••" menüsünde); Chrome iOS'ta Paylaş
     adres çubuğunda. Deneme YALNIZ Google girişiyle 7 gün tam, kart yok, hesap
     başına bir kez (bendiq-ios CLAUDE.md + canlıda ölçülmüş). Lisans hesaba
     bağlı, Android/Windows'tan tamamen ayrı (pakete girmez). 16 dil. 2D/3D/4D,
     kalibrasyon, DXF, 1:1, PDF bendiq-ios kaynağında var; yapay zekâ tarama
     iOS'ta YOK (Android maddesi iOS'a yazılmaz). Fiyat yazılmaz.
   - Linux (15.11.2026 ölçüldü): Snap Store herkese açık, snapcraft.io/bendiq
     200; api.snapcraft.io → stable amd64 rev 2 = 1.1.36 (14.11 yayın). Arayüz
     Windows masaüstü arayüzünün aynısı (bendiq-linux, a658383'ten ayrıldı);
     hesap ve bilgisayar lisansı Windows ile ORTAK (K42; 14.11 canlı sunucuda
     Linux girişi geçti, cihaz yuvası Linux'a taşındı). 25 dil (Windows ile aynı
     kod). GPU'suz makinede Chromium WebGL'i kapatıyor (K44) → 3D/4D için grafik
     hızlandırma notu. YAZILMAYANLAR: Linux'ta deneme süresi (ölçülmedi),
     mağazadan gerçek kurulum (denenmedi), dosya/yazdırma (ölçülmedi).
   - Yol haritası YOK (kullanıcı 25.10.2026): sırada/planlanan özellik yazılmaz,
     rakibe fikir vermesin. Yalnız yayındaki özellik anlatılır.
   - FOLD modu + arka dayama ofseti bir kullanıcı isteğinden doğdu
     (ozer-bend-pro1 CLAUDE.md "Arka dayama ofseti + FOLD modu").
   Yazılmayanlar (bilerek): fiyat rakamı (mağazada değişebilir; mağazaya
   bağlanılır), tasarruf yüzdesi/süre, "hatasız / ilk seferde", "makineye
   bağlanır". Çarpışma "yok" yalnız modellenen bileşenler için.
   Birim: uygulama yalnız mm (inç işi 25.10 iptal); sınırlarda açıkça yazılır,
   mağaza M0 ile aynı (en-US "Metric units: ... mm").

   Görseller: Play mağaza kareleri (store/listing/assets/screenshots/<dil>),
   540×960 webp, dile göre. Karelerdeki sayılar mağaza demosudur.
   Üç dilin şekli prerender.mjs'te denetlenir (anahtar + dizi uzunluğu). */

export const BENDIQ_PATH = '/bendiq'

export const MS_STORE_BENDIQ = 'https://apps.microsoft.com/detail/9N5NCGC9WX3Z'

/* iPhone / iPad: App Store yok, Safari'de açılan uygulama (PWA). */
export const IOS_APP_BENDIQ = 'https://app.ozerlabs.com'

/* Linux: Snap Store sayfası (paket adı bendiq). */
export const SNAP_BENDIQ = 'https://snapcraft.io/bendiq'

/* Windows yeni arayüz karesi (dile göre), 1200×650. */
export const winShotSrc = (lang) => `/bendiq/${lang}/win.webp`
export const WIN_SHOT_W = 1200
export const WIN_SHOT_H = 650

/* Kare adları üç dilde aynı; sıra mağazadaki sıradır. */
export const BENDIQ_SHOTS = ['01_4d', '02_cal', '03_col', '04_main', '05_fold', '06_prod', '07_2d']
export const shotSrc = (lang, key) => `/bendiq/${lang}/${key}.webp`
export const SHOT_W = 540
export const SHOT_H = 960

export const bendiqPage = {
  fr: {
    meta: {
      title: 'BENDIQ — Calcul de pliage et simulation 4D pour presse plieuse',
      description:
        "Développé et perte au pli calibrés sur votre presse plieuse, ordre de pliage, contrôle de collision 4D, DXF, gabarit 1:1 et PDF. Sur Android, iPhone, iPad, Windows et Linux. Essai gratuit sans carte sur Android, iPhone et Windows.",
    },
    hero: {
      news: 'Nouveau : BENDIQ sur Linux · iPhone et iPad · nouvelle interface Windows',
      eyebrow: 'BENDIQ · Pour les opérateurs de presse plieuse',
      title: 'Voyez la pièce pliée',
      accent: 'avant de découper la tôle',
      sub: "BENDIQ calcule le développé avec la perte au pli mesurée sur votre machine, cherche l'ordre de pliage et montre en 4D si une aile touche l'outil. Tout cela avant la découpe.",
      ctaPlay: 'Essayer 7 jours sur Google Play',
      ctaIos: 'Essayer 7 jours sur iPhone',
      ctaWindows: 'Version Windows',
      trust: ['Android · Google Play', 'iPhone et iPad · Safari', 'Windows · Microsoft Store', 'Linux · Snap Store', 'Essai gratuit sans carte bancaire', 'Résiliable à tout moment'],
      shotAlt:
        "Écran 4D de BENDIQ : presse plieuse à l'échelle, pli 3 sur l'aile C à 96°, pupitre CNC affichant l'ordre A B C D.",
    },
    cost: {
      eyebrow: 'Le vrai coût',
      title: "Un pli raté se paie à l'atelier",
      sub: "On le découvre souvent sur la presse, quand la tôle est déjà coupée.",
      items: [
        { title: 'La tôle au rebut', text: 'Matière, découpe laser et temps déjà passés partent à la ferraille.' },
        { title: "Le pli d'essai de trop", text: 'Plier, mesurer, recalculer, recouper : la presse tourne sans produire.' },
        { title: "L'aile qui touche au 3e pli", text: "On le voit avec la pièce à moitié pliée, l'outil en place." },
        { title: 'La table qui ne connaît pas votre presse', text: 'Une perte au pli standard ignore votre matrice, votre machine et votre lot de matière.' },
      ],
      anchor: 'Une tôle inox au rebut, ou un mois de BENDIQ ? Faites le calcul avec vos propres prix.',
    },
    flow: {
      eyebrow: 'Comment ça marche',
      title: 'Cinq étapes, un seul calcul',
      sub: 'La longueur affichée, le dessin 2D, la 3D, la 4D, le PDF et le DXF viennent des mêmes données.',
      steps: [
        { k: 'Calculer', text: "Matière, épaisseur, angle, rayon et V : la longueur de coupe se calcule dès la saisie. Profils L, U, Z, oméga, C ou dessin libre." },
        { k: 'Contrôler', text: "Un pli d'essai mesuré enregistre la perte au pli de votre machine pour chaque matière + épaisseur + V. Outil hors tonnage catalogue : affiché en rouge." },
        { k: 'Voir', text: 'Plan 2D coté, 3D au vrai rayon, puis la presse complète en 4D avec 621 outils du catalogue et contrôle de collision.' },
        { k: 'Plier', text: "Mode opérateur pas à pas : angle, cote de butée arrière et retournement de la pièce à chaque pli." },
        { k: 'Exporter', text: 'DXF R12 pour le laser et le plasma, gabarit de découpe 1:1 sur A4, page de développé et rapport en PDF.' },
      ],
    },
    platforms: {
      eyebrow: 'Sur quel écran',
      title: 'Le téléphone à la presse, Windows ou Linux au bureau',
      sub: 'Android, iPhone, iPad, Windows et Linux sont disponibles aujourd’hui. Android, iPhone/iPad et ordinateur ont chacun leur licence ; Windows et Linux partagent la même.',
      available: 'Disponible',
      newTag: 'Nouveau',
      ios: {
        title: 'iPhone et iPad',
        lead: "Sans App Store : BENDIQ s'ouvre dans Safari, se pose sur l'écran d'accueil et s'ouvre ensuite comme une application.",
        stepsTitle: 'Installer en 3 gestes',
        steps: [
          'Ouvrez app.ozerlabs.com dans Safari.',
          'Touchez Partager (sur iOS 26, dans le menu « ••• »).',
          'Choisissez « Sur l’écran d’accueil », puis ouvrez BENDIQ depuis son icône.',
        ],
        points: [
          'Développé, perte au pli calibrée, 2D, 3D et 4D avec contrôle de collision',
          'DXF, gabarit 1:1 et PDF',
          '7 jours d’essai complet avec un compte Google, sans carte bancaire',
          'Licence liée à votre compte, distincte d’Android et de l’ordinateur (Windows, Linux)',
        ],
        note: 'Avec Chrome sur iPhone, le bouton Partager se trouve dans la barre d’adresse.',
        cta: 'Ouvrir app.ozerlabs.com',
      },
      android: {
        title: 'Android',
        lead: "L'outil reste dans la poche, à côté de la presse. Pas d'aller-retour au bureau pour un développé.",
        points: [
          'Relevé de cotes par photo et saisie à la voix',
          'Mode opérateur pas à pas, pli par pli',
          'Calibrages par matière + épaisseur + V gardés sur le téléphone, avec sauvegarde et restauration',
          'DXF, gabarit 1:1 et PDF exportés depuis le téléphone',
          '7 jours d’essai complet, puis développé de 3 pièces par jour gratuit',
          'Projets et calibrages conservés, même sans licence',
        ],
        cta: 'Voir sur Google Play',
      },
      windows: {
        title: 'Windows',
        newTag: 'Nouvelle interface',
        lead: 'Un seul écran pour préparer la série : les commandes en haut, les cotes à gauche, le plan coté au centre, le résultat et les exports à droite.',
        points: [
          'Plus stable : un angle vide ou hors de 1–179° ne dessine plus de section, l’import DXF ouvre plus de fichiers et donne la raison d’un angle refusé, mise à jour de sécurité',
          'Ordre de pliage manuel : vous fixez la séquence, le rapport signale une collision',
          "Import DXF d'une section, segments contrôlés avant d'appliquer",
          'Profils machine : outils et cotes de bâti pour chaque presse (abonnement annuel)',
          'Liste de travail multi-pièces, PDF et DXF par lot',
          'Fichiers projet .bendiq : ouvrir, enregistrer, récents',
          'Fiche de réglage PDF depuis la 4D, une carte par pli',
          'Raccourcis clavier : F1 pour la liste, Ctrl+P imprimer, Ctrl+E DXF, F5 4D',
        ],
        note: 'Licence séparée de celle du téléphone. Essai gratuit de 3 jours sur votre ordinateur, sans carte bancaire.',
        cta: 'Voir sur Microsoft Store',
        shotAlt: "Nouvelle interface de BENDIQ sur Windows : barre de commandes en haut, cotes d'un profil en U à gauche, plan technique coté au centre, longueur de coupe, poids et boutons DXF, 1:1, PDF et Imprimer à droite.",
      },
      linux: {
        title: 'Linux',
        lead: 'La même interface que sous Windows, installée depuis le Snap Store : commandes en haut, cotes à gauche, plan coté au centre, résultat et exports à droite.',
        points: [
          'Installation depuis le Snap Store, sur PC 64 bits',
          'Même compte et même licence ordinateur que sous Windows',
          'Interface en 25 langues, comme sous Windows',
        ],
        note: 'La 3D et la 4D ont besoin de l’accélération graphique de l’ordinateur.',
        cta: 'Voir sur le Snap Store',
      },
    },
    field: {
      eyebrow: 'Sur le terrain',
      title: 'Ce que chacun y gagne',
      roles: [
        { who: 'Opérateur', title: 'Moins de calcul à la main devant la presse', text: "Le développé, l'ordre de pliage, la cote de butée et le moment de retourner la pièce sont sur le téléphone." },
        { who: "Chef d'atelier", title: "Moins de rebuts et de plis d'essai", text: 'Les valeurs mesurées sur vos machines servent à chaque nouvelle pièce, et les collisions se voient avant la découpe.' },
        { who: 'Méthodes et client', title: 'Un calcul, tous les documents', text: 'DXF pour la découpe, plan coté en PDF et gabarit 1:1 sortent des mêmes chiffres que ceux de l’opérateur.' },
      ],
    },
    limits: {
      title: 'Ce que BENDIQ ne promet pas',
      items: [
        "Il ne pilote pas la presse et ne s'y connecte pas : la machine et le pupitre en 4D sont une visualisation.",
        "Le contrôle de collision couvre les outils, le bâti et la butée modélisés ; le reste se vérifie sur la machine.",
        "Le résultat suit votre calibrage : lot de matière, sens de laminage et usure de l'outil comptent.",
        "Sur une pièce critique, un pli d'essai reste la règle avant la série.",
        'Toutes les cotes se saisissent et s’affichent en millimètres ; les pouces ne sont pas proposés.',
      ],
    },
    faq: {
      title: 'Questions fréquentes',
      items: [
        { q: 'BENDIQ pilote-t-il ma presse plieuse ?', a: "Non. BENDIQ calcule, prépare et simule. Il ne se connecte pas à la machine et ne lui envoie aucun programme : vous reportez les valeurs vous-même." },
        { q: 'BENDIQ fonctionne-t-il sur iPhone ?', a: "Oui, sur iPhone et iPad, sans passer par l'App Store. Ouvrez app.ozerlabs.com dans Safari, touchez Partager puis « Sur l'écran d'accueil » : BENDIQ s'ouvre ensuite depuis son icône, comme une application. Continuez avec Google pour l'essai de 7 jours sans carte." },
        { q: 'BENDIQ fonctionne-t-il sous Linux ?', a: "Oui. BENDIQ s'installe depuis le Snap Store sur un PC 64 bits, avec la même interface que sous Windows. Le compte et la licence ordinateur sont les mêmes que sous Windows. La 3D et la 4D ont besoin de l'accélération graphique de l'ordinateur." },
        { q: 'Le développé sera-t-il juste sur ma machine ?', a: "Les tables standard sont un point de départ. Mesurez un pli d'essai : BENDIQ enregistre la perte au pli de votre machine pour cette matière, cette épaisseur et ce V. Avant une série, un pli d'essai sur les pièces critiques reste nécessaire." },
        { q: 'Que puis-je faire sans licence ?', a: "Sur Android : 7 jours d'essai complet sans carte bancaire (connexion Google), puis le développé de 3 pièces par jour avec aperçu 2D/3D. Sur iPhone et iPad : 7 jours d'essai complet avec un compte Google, sans carte bancaire. Sur Windows : 3 jours d'essai sans carte bancaire, puis le résultat d'une pièce, une fois. Sur Android et Windows, vos projets et calibrages ne sont pas supprimés." },
        { q: 'Une licence vaut-elle sur les autres appareils ?', a: "Non, sauf entre Windows et Linux, qui partagent la licence ordinateur. Android, iPhone/iPad et ordinateur ont chacun leur licence. Le pack atelier réunit un ordinateur et un téléphone Android. Les prix sont affichés dans chaque store et, sur iPhone et sous Linux, dans l'application." },
        { q: "Mon outil n'est pas dans le catalogue.", a: "Envoyez le DXF de votre matrice : nous le testons et l'ajoutons au catalogue." },
        { q: "Dans quelles langues ?", a: "Les applications Android et iPhone sont en 16 langues, dont le français, l'anglais et le turc. La version ordinateur (Windows et Linux) en propose 25." },
      ],
    },
    final: {
      title: 'Essayez-la sur votre prochaine pièce',
      sub: "Essai gratuit sans carte bancaire : 7 jours sur Android et iPhone, 3 jours sur Windows. Résiliable à tout moment.",
      ctaPlay: 'Essayer sur Google Play',
      ctaIos: 'Essayer sur iPhone',
      ctaWindows: 'Version Windows',
      contact: 'Une question avant d’essayer ? Écrivez-nous',
    },
  },

  en: {
    meta: {
      title: 'BENDIQ — Press brake bending calculator and 4D simulation',
      description:
        'Flat pattern and bend deduction calibrated on your own press brake, bend sequence, 4D collision check, DXF, 1:1 template and PDF. On Android, iPhone, iPad, Windows and Linux. Free trial with no card on Android, iPhone and Windows.',
    },
    hero: {
      news: 'New: BENDIQ on Linux · iPhone and iPad · new Windows interface',
      eyebrow: 'BENDIQ · Built for press brake operators',
      title: 'See the bent part',
      accent: 'before you cut the sheet',
      sub: 'BENDIQ calculates the flat pattern with the bend deduction measured on your machine, finds the bend sequence and shows in 4D whether a flange hits the tooling. All before cutting.',
      ctaPlay: 'Try 7 days on Google Play',
      ctaIos: 'Try 7 days on iPhone',
      ctaWindows: 'Windows version',
      trust: ['Android · Google Play', 'iPhone and iPad · Safari', 'Windows · Microsoft Store', 'Linux · Snap Store', 'Free trial, no credit card', 'Cancel anytime'],
      shotAlt:
        'BENDIQ 4D screen: full-scale press brake, bend 3 on flange C at 96°, CNC panel showing the sequence A B C D.',
    },
    cost: {
      eyebrow: 'The real cost',
      title: 'A bad bend is paid for on the shop floor',
      sub: 'It usually shows up at the press, once the sheet is already cut.',
      items: [
        { title: 'The scrapped sheet', text: 'Material, laser cutting and the time already spent go into the scrap bin.' },
        { title: 'One test bend too many', text: 'Bend, measure, recalculate, recut: the press runs without producing.' },
        { title: 'The flange that hits on bend 3', text: 'You see it with the part half-bent and the tooling in place.' },
        { title: "The chart that doesn't know your press", text: 'A standard bend deduction ignores your die, your machine and your material batch.' },
      ],
      anchor: 'One scrapped stainless sheet, or a month of BENDIQ? Do the maths with your own prices.',
    },
    flow: {
      eyebrow: 'How it works',
      title: 'Five steps, one calculation',
      sub: 'The flat length on screen, the 2D drawing, 3D, 4D, PDF and DXF all come from the same data.',
      steps: [
        { k: 'Calculate', text: 'Material, thickness, angle, radius and V: the flat length is calculated as you type. L, U, Z, hat and C profiles, or free drawing.' },
        { k: 'Check', text: 'One measured test bend stores your machine’s bend deduction for each material + thickness + V. Tooling over its catalogue tonnage: shown in red.' },
        { k: 'See', text: 'Dimensioned 2D drawing, 3D at the real radius, then the full press brake in 4D with 621 catalogue tools and a collision check.' },
        { k: 'Bend', text: 'Step-by-step operator mode: angle, back gauge value and when to flip the part, for every bend.' },
        { k: 'Export', text: 'R12 DXF for laser and plasma, 1:1 cutting template on A4, flat pattern page and report as PDF.' },
      ],
    },
    platforms: {
      eyebrow: 'On which screen',
      title: 'The phone at the press, Windows or Linux at the desk',
      sub: 'Android, iPhone, iPad, Windows and Linux are available today. Android, iPhone/iPad and computer each have their own licence; Windows and Linux share the same one.',
      available: 'Available',
      newTag: 'New',
      ios: {
        title: 'iPhone and iPad',
        lead: 'No App Store needed: BENDIQ opens in Safari, sits on your home screen and then opens like an app.',
        stepsTitle: 'Install in 3 taps',
        steps: [
          'Open app.ozerlabs.com in Safari.',
          'Tap Share (on iOS 26, inside the “•••” menu).',
          'Choose “Add to Home Screen”, then open BENDIQ from its icon.',
        ],
        points: [
          'Flat pattern, calibrated bend deduction, 2D, 3D and 4D with collision check',
          'DXF, 1:1 template and PDF',
          '7-day full trial with a Google account, no credit card',
          'Licence tied to your account, separate from Android and the computer (Windows, Linux)',
        ],
        note: 'In Chrome on iPhone, the Share button is in the address bar.',
        cta: 'Open app.ozerlabs.com',
      },
      android: {
        title: 'Android',
        lead: 'The tool stays in your pocket, next to the press. No trip to the office for a flat pattern.',
        points: [
          'Dimensions from a photo, and voice input',
          'Step-by-step operator mode, bend by bend',
          'Calibrations per material + thickness + V kept on the phone, with backup and restore',
          'DXF, 1:1 template and PDF exported from the phone',
          '7-day full trial, then the flat pattern of 3 parts a day for free',
          'Projects and calibrations kept, even without a licence',
        ],
        cta: 'View on Google Play',
      },
      windows: {
        title: 'Windows',
        newTag: 'New interface',
        lead: 'One screen to prepare a batch: commands at the top, dimensions on the left, the dimensioned drawing in the middle, result and exports on the right.',
        points: [
          'More stable: an empty angle or one outside 1–179° no longer draws a section, DXF import opens more files and gives the reason when an angle is refused, security update',
          'Manual bend sequence: you set the order, the report flags a collision',
          'DXF import of a section, segments checked before applying',
          'Machine profiles: tooling and frame dimensions for each press brake (annual plan)',
          'Multi-part job list, batch PDF and DXF',
          '.bendiq project files: open, save, recent',
          'PDF setup sheet from the 4D view, one card per bend',
          'Keyboard shortcuts: F1 for the list, Ctrl+P print, Ctrl+E DXF, F5 4D',
        ],
        note: 'Licensed separately from the phone. 3-day free trial on your computer, no credit card.',
        cta: 'View on Microsoft Store',
        shotAlt: 'New BENDIQ interface on Windows: command bar at the top, U-profile dimensions on the left, dimensioned technical drawing in the middle, flat length, weight and DXF, 1:1, PDF and Print buttons on the right.',
      },
      linux: {
        title: 'Linux',
        lead: 'The same interface as on Windows, installed from the Snap Store: commands at the top, dimensions on the left, the dimensioned drawing in the middle, result and exports on the right.',
        points: [
          'Installed from the Snap Store, on 64-bit PCs',
          'Same account and same computer licence as on Windows',
          'Interface in 25 languages, as on Windows',
        ],
        note: '3D and 4D need the computer’s graphics acceleration.',
        cta: 'View on the Snap Store',
      },
    },
    field: {
      eyebrow: 'On the shop floor',
      title: 'What each person gains',
      roles: [
        { who: 'Operator', title: 'Less hand calculation at the press', text: 'Flat pattern, bend sequence, back gauge value and when to flip the part are on the phone.' },
        { who: 'Shop manager', title: 'Less scrap and fewer test bends', text: 'Values measured on your machines are reused for every new part, and collisions show up before cutting.' },
        { who: 'Engineering and customer', title: 'One calculation, every document', text: 'DXF for cutting, dimensioned PDF drawing and 1:1 template come from the same numbers the operator sees.' },
      ],
    },
    limits: {
      title: 'What BENDIQ does not promise',
      items: [
        'It does not control the press or connect to it: the machine and CNC panel in 4D are a visualisation.',
        'The collision check covers the modelled tooling, frame and back gauge; anything else is checked on the machine.',
        'Results follow your calibration: material batch, rolling direction and tool wear all matter.',
        'On a critical part, a test bend is still the rule before production.',
        'Metric only: every dimension is entered and shown in mm; inches are not available.',
      ],
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        { q: 'Does BENDIQ control my press brake?', a: 'No. BENDIQ calculates, prepares and simulates. There is no link between BENDIQ and the machine, and no program is sent to it: you enter the values yourself.' },
        { q: 'Does BENDIQ work on iPhone?', a: 'Yes, on iPhone and iPad, without the App Store. Open app.ozerlabs.com in Safari, tap Share, then “Add to Home Screen”: BENDIQ then opens from its icon, like an app. Continue with Google for the 7-day trial with no card.' },
        { q: 'Does BENDIQ work on Linux?', a: 'Yes. BENDIQ installs from the Snap Store on a 64-bit PC, with the same interface as on Windows. The account and the computer licence are the same as on Windows. 3D and 4D need the computer’s graphics acceleration.' },
        { q: 'Will the flat pattern be right on my machine?', a: 'Standard charts are a starting point. Measure one test bend: BENDIQ stores your machine’s bend deduction for that material, thickness and V. Before a batch, a test bend on critical parts is still needed.' },
        { q: 'What can I do without a licence?', a: 'On Android: a 7-day full trial without a credit card (Google sign-in), then the flat pattern of 3 parts a day with 2D/3D preview. On iPhone and iPad: a 7-day full trial with a Google account, no credit card. On Windows: a 3-day trial without a credit card, then the result of one part, once. On Android and Windows, your projects and calibrations are not deleted.' },
        { q: 'Does one licence work on other devices?', a: 'No, except between Windows and Linux, which share the computer licence. Android, iPhone/iPad and computer each have their own licence. The shop pack combines one computer and one Android phone. Prices are shown in each store and, on iPhone and Linux, in the app.' },
        { q: 'My tool is not in the catalogue.', a: 'Send us your die’s DXF file: we test it and add it to the catalogue.' },
        { q: 'Which languages?', a: 'The Android and iPhone apps are available in 16 languages, including French, English and Turkish. The computer version (Windows and Linux) offers 25.' },
      ],
    },
    final: {
      title: 'Try it on your next part',
      sub: 'Free trial with no credit card: 7 days on Android and iPhone, 3 days on Windows. Cancel anytime.',
      ctaPlay: 'Try on Google Play',
      ctaIos: 'Try on iPhone',
      ctaWindows: 'Windows version',
      contact: 'A question before trying? Write to us',
    },
  },

  tr: {
    meta: {
      title: 'BENDIQ — Abkant büküm hesabı ve 4D simülasyon',
      description:
        'Kendi abkantınıza kalibre edilmiş açınım ve büküm payı, büküm sırası, 4D çarpışma kontrolü, DXF, 1:1 şablon ve PDF. Android, iPhone, iPad, Windows ve Linux’ta. Android, iPhone ve Windows’ta kartsız ücretsiz deneme.',
    },
    hero: {
      news: 'Yeni: BENDIQ artık Linux’ta · iPhone ve iPad · Windows’ta yeni arayüz',
      eyebrow: 'BENDIQ · Abkant operatörleri için',
      title: 'Bükülmüş parçayı görün,',
      accent: 'sacı sonra kesin',
      sub: 'BENDIQ açınımı kendi makinenizde ölçülen büküm payıyla hesaplar, büküm sırasını arar ve bir kanadın takıma çarpıp çarpmadığını 4D’de gösterir. Hepsi kesimden önce.',
      ctaPlay: "Google Play'de 7 gün deneyin",
      ctaIos: "iPhone'da 7 gün deneyin",
      ctaWindows: 'Windows sürümü',
      trust: ['Android · Google Play', 'iPhone ve iPad · Safari', 'Windows · Microsoft Store', 'Linux · Snap Store', 'Ücretsiz deneme, kredi kartı yok', 'İstediğiniz an iptal'],
      shotAlt:
        'BENDIQ 4D ekranı: gerçek ölçekli abkant, C kanadında 3. büküm 96°, CNC panelde A B C D sırası.',
    },
    cost: {
      eyebrow: 'Gerçek maliyet',
      title: 'Hatalı büküm atölyede ödenir',
      sub: 'Çoğu zaman sac kesildikten sonra, abkantın başında fark edilir.',
      items: [
        { title: 'Hurdaya giden sac', text: 'Malzeme, lazer kesim ve harcanan zaman hurdaya gider.' },
        { title: 'Bir deneme bükümü daha', text: 'Bük, ölç, yeniden hesapla, yeniden kes: abkant üretmeden çalışır.' },
        { title: '3. bükümde çarpan kanat', text: 'Parça yarı bükülmüş, takım bağlıyken görülür.' },
        { title: 'Abkantınızı tanımayan tablo', text: 'Standart büküm payı kalıbınızı, makinenizi ve malzeme partinizi bilmez.' },
      ],
      anchor: 'Hurdaya giden bir paslanmaz sac mı, bir aylık BENDIQ mi? Hesabı kendi fiyatlarınızla yapın.',
    },
    flow: {
      eyebrow: 'Nasıl çalışır',
      title: 'Beş adım, tek hesap',
      sub: 'Ekrandaki kesilecek en, 2D çizim, 3D, 4D, PDF ve DXF aynı veriden gelir.',
      steps: [
        { k: 'Hesapla', text: 'Malzeme, kalınlık, açı, radüs ve V: kesim boyu ölçüyü girerken hesaplanır. L, U, Z, şapka, dudaklı C profilleri ya da serbest çizim.' },
        { k: 'Kontrol et', text: 'Ölçülen tek deneme bükümü, makinenizin büküm payını her malzeme + kalınlık + V için kaydeder. Katalog tonajını aşan takım kırmızı görünür.' },
        { k: 'Gör', text: 'Ölçülendirilmiş 2D resim, gerçek radüslü 3D, ardından 621 katalog takımı ve çarpışma kontrolüyle abkantın tamamı 4D’de.' },
        { k: 'Bük', text: 'Adım adım operatör modu: her bükümde açı, arka dayama ölçüsü ve parçayı çevirme anı.' },
        { k: 'Çıktı al', text: 'Lazer ve plazma için R12 DXF, A4’te 1:1 kesim şablonu, açınım sayfası ve rapor PDF olarak.' },
      ],
    },
    platforms: {
      eyebrow: 'Hangi ekranda',
      title: 'Abkantın yanında telefon, masada Windows ya da Linux',
      sub: 'Android, iPhone, iPad, Windows ve Linux bugün kullanılabilir. Android, iPhone/iPad ve bilgisayarın her birinin kendi lisansı var; Windows ve Linux aynı lisansı paylaşır.',
      available: 'Yayında',
      newTag: 'Yeni',
      ios: {
        title: 'iPhone ve iPad',
        lead: 'App Store gerekmez: BENDIQ Safari’de açılır, ana ekrana eklenir ve sonra uygulama gibi açılır.',
        stepsTitle: '3 adımda kurulum',
        steps: [
          'Safari’de app.ozerlabs.com adresini açın.',
          'Paylaş’a dokunun (iOS 26’da “•••” menüsünün içinde).',
          '“Ana Ekrana Ekle”yi seçin, sonra BENDIQ’i simgesinden açın.',
        ],
        points: [
          'Açınım, kalibre edilmiş büküm payı, çarpışma kontrolüyle 2D, 3D ve 4D',
          'DXF, 1:1 şablon ve PDF',
          'Google hesabıyla 7 gün tam deneme, kredi kartı yok',
          'Lisans hesabınıza bağlı, Android ve bilgisayardan (Windows, Linux) ayrı',
        ],
        note: 'iPhone’da Chrome kullanıyorsanız Paylaş düğmesi adres çubuğundadır.',
        cta: 'app.ozerlabs.com’u aç',
      },
      android: {
        title: 'Android',
        lead: 'Araç cebinizde, abkantın yanında durur. Bir açınım için ofise gidip gelmezsiniz.',
        points: [
          'Fotoğraftan ölçü tarama ve sesle ölçü girişi',
          'Adım adım operatör modu, büküm büküm',
          'Malzeme + kalınlık + V kalibrasyonları telefonda; yedekleme ve geri yükleme',
          'DXF, 1:1 şablon ve PDF telefondan çıkar',
          '7 gün tam deneme, sonra günde 3 parçanın açınımı ücretsiz',
          'Lisans olmasa da projeler ve kalibrasyonlar silinmez',
        ],
        cta: "Google Play'de gör",
      },
      windows: {
        title: 'Windows',
        newTag: 'Yeni arayüz',
        lead: 'Seri işi tek ekranda hazırlayın: komutlar üstte, ölçüler solda, ölçülü teknik resim ortada, sonuç ve çıktılar sağda.',
        points: [
          'Daha kararlı: boş ya da 1–179° dışı açı artık kesit çizmez, DXF içe alma daha çok dosya açar ve reddedilen açının nedenini yazar, güvenlik güncellemesi',
          'Elle büküm sırası: sırayı siz belirlersiniz, çarpışma varsa rapor söyler',
          'Bir kesitin DXF’ini içe alma, uygulamadan önce segment kontrolü',
          'Makine profilleri: her abkant için ayrı takım ve gövde ölçüleri (yıllık abonelik)',
          'Çok parçalı iş listesi, toplu PDF ve DXF',
          '.bendiq proje dosyaları: aç, kaydet, son kullanılanlar',
          '4D görünümden kurulum föyü PDF, her büküme bir kart',
          'Klavye kısayolları: F1 liste, Ctrl+P yazdır, Ctrl+E DXF, F5 4D',
        ],
        note: 'Telefon lisansından ayrı lisanslanır. Bilgisayarınızda 3 gün ücretsiz deneme, kredi kartı yok.',
        cta: "Microsoft Store'da gör",
        shotAlt: 'Windows’ta BENDIQ’in yeni arayüzü: üstte komut çubuğu, solda U profilin ölçüleri, ortada ölçülü teknik resim, sağda kesim boyu, ağırlık ve DXF, 1:1, PDF, Yazdır düğmeleri.',
      },
      linux: {
        title: 'Linux',
        lead: 'Windows’takiyle aynı arayüz, Snap Store’dan kurulur: komutlar üstte, ölçüler solda, ölçülü teknik resim ortada, sonuç ve çıktılar sağda.',
        points: [
          'Snap Store’dan kurulum, 64 bit PC’de',
          'Windows’la aynı hesap ve aynı bilgisayar lisansı',
          'Windows’taki gibi 25 dilde arayüz',
        ],
        note: '3D ve 4D için bilgisayarın grafik hızlandırması gerekir.',
        cta: "Snap Store'da gör",
      },
    },
    field: {
      eyebrow: 'Sahada',
      title: 'Kim ne kazanır',
      roles: [
        { who: 'Operatör', title: 'Abkant başında daha az elle hesap', text: 'Açınım, büküm sırası, arka dayama ölçüsü ve parçayı çevirme anı telefonda.' },
        { who: 'Atölye şefi', title: 'Daha az hurda, daha az deneme bükümü', text: 'Makinelerinizde ölçülen değerler her yeni parçada kullanılır, çarpışma kesimden önce görülür.' },
        { who: 'Planlama ve müşteri', title: 'Tek hesap, bütün belgeler', text: 'Kesim için DXF, ölçülü PDF resim ve 1:1 şablon operatörün gördüğü aynı sayılardan çıkar.' },
      ],
    },
    limits: {
      title: 'BENDIQ neyi vaat etmez',
      items: [
        'Abkantı kumanda etmez, makineyle bağlantısı yoktur: 4D’deki makine ve CNC panel görselleştirmedir.',
        'Çarpışma kontrolü modellenen takımı, gövdeyi ve arka dayamayı kapsar; geri kalanı makinede kontrol edilir.',
        'Sonuç kalibrasyonunuza bağlıdır: malzeme partisi, hadde yönü ve takım aşınması etkiler.',
        'Kritik parçada seri üretimden önce deneme bükümü yine kuraldır.',
        'Bütün ölçüler milimetre ile girilir ve gösterilir; inç seçeneği yoktur.',
      ],
    },
    faq: {
      title: 'Sık sorulan sorular',
      items: [
        { q: 'BENDIQ abkantımı kumanda eder mi?', a: 'Hayır. BENDIQ hesaplar, hazırlar ve simüle eder. Makineyle bağlantısı yoktur, program göndermez: değerleri makineye siz girersiniz.' },
        { q: 'BENDIQ iPhone’da çalışır mı?', a: 'Evet, iPhone ve iPad’de, App Store’a gerek olmadan. Safari’de app.ozerlabs.com adresini açın, Paylaş’a ve ardından “Ana Ekrana Ekle”ye dokunun: BENDIQ bundan sonra simgesinden uygulama gibi açılır. Kartsız 7 günlük deneme için Google ile devam edin.' },
        { q: 'BENDIQ Linux’ta çalışır mı?', a: 'Evet. BENDIQ 64 bit PC’de Snap Store’dan kurulur, arayüzü Windows’takiyle aynıdır. Hesap ve bilgisayar lisansı Windows’takiyle aynıdır. 3D ve 4D için bilgisayarın grafik hızlandırması gerekir.' },
        { q: 'Açınım benim makinemde doğru çıkar mı?', a: 'Standart tablolar başlangıç noktasıdır. Bir deneme bükümü ölçün: BENDIQ o malzeme, kalınlık ve V için makinenizin büküm payını kaydeder. Seri üretimden önce kritik parçada deneme bükümü yine gerekir.' },
        { q: 'Lisans olmadan ne yapabilirim?', a: 'Android’de: kredi kartı istemeyen 7 gün tam deneme (Google girişi), sonra günde 3 parçanın açınımı ve 2D/3D önizleme. iPhone ve iPad’de: Google hesabıyla 7 gün tam deneme, kredi kartı yok. Windows’ta: kredi kartı istemeyen 3 gün deneme, sonra bir parçanın sonucu, bir kez. Android ve Windows’ta projeleriniz ve kalibrasyonlarınız silinmez.' },
        { q: 'Bir lisans öteki cihazlarda geçer mi?', a: 'Hayır; yalnız Windows ve Linux bilgisayar lisansını paylaşır. Android, iPhone/iPad ve bilgisayarın her birinin kendi lisansı var. Atölye paketi bir bilgisayar ile bir Android telefonu birleştirir. Fiyatlar her mağazada, iPhone’da ve Linux’ta ise uygulamanın içinde görünür.' },
        { q: 'Takımım katalogda yok.', a: 'Kalıbınızın DXF dosyasını gönderin: test edip kataloğa ekleyelim.' },
        { q: 'Hangi dillerde?', a: 'Android ve iPhone uygulamaları Türkçe, Fransızca ve İngilizce dahil 16 dilde. Bilgisayar sürümü (Windows ve Linux) 25 dil sunar.' },
      ],
    },
    final: {
      title: 'Bir sonraki parçanızda deneyin',
      sub: 'Kredi kartı istemeyen ücretsiz deneme: Android ve iPhone’da 7 gün, Windows’ta 3 gün. İstediğiniz an iptal.',
      ctaPlay: "Google Play'de deneyin",
      ctaIos: "iPhone'da deneyin",
      ctaWindows: 'Windows sürümü',
      contact: 'Denemeden önce sorunuz mu var? Bize yazın',
    },
  },
}
