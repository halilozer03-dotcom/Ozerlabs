/* BENDIQ tanıtım sayfası (/bendiq) — metin ve medya tek kaynak.

   Her iddia ürün kaynağından doğrulandı (2026-10-25):
   - Android: Play mağaza girişi ozer-bend-pro1/store/listing/<dil>.md
     (7 gün deneme kartsız, ücretsiz mod günde 3 parça, 621 katalog takımı,
     DXF R12, 1:1 şablon, 16 dil). Play sayfası canlı (200).
   - Windows: bendiq-win/store/windows/fr-FR.md + Microsoft Store canlı sayfa
     (sürüm 1.1.31, 24.10.2026). Ayrı lisans, bir parçalık ücretsiz sonuç,
     iş listesi / proje dosyası / kurulum föyü / CSV kalibrasyon / segment stoğu.
   - Web modu: YAYINDA DEĞİL. Abonelik kodunda platform olarak planlı
     (entitlementRules MAX_ONLY_PLATFORMS web/ios); sayfada "hazırlanıyor"
     diye ve yol haritasında durur. Yayınlanınca durum çipi ve metin değişir.
   - Yol haritası "sıradaki" adımı: çevrimdışı kurumsal/beta lisans anahtarı
     (Android b28e400, Windows aac625a — main'de, mağazada değil) ve
     güncellenmiş makine listesi (Android ae59c79, Windows 1.1.32 notu).
   - FOLD modu + arka dayama ofseti bir kullanıcı isteğinden doğdu
     (ozer-bend-pro1 CLAUDE.md "Arka dayama ofseti + FOLD modu").
   Yazılmayanlar (bilerek): fiyat rakamı (mağazada değişebilir; mağazaya
   bağlanılır), tasarruf yüzdesi/süre, "hatasız / ilk seferde", "makineye
   bağlanır". Çarpışma "yok" yalnız modellenen bileşenler için.

   Görseller: Play mağaza kareleri (store/listing/assets/screenshots/<dil>),
   540×960 webp, dile göre. Karelerdeki sayılar mağaza demosudur.
   Üç dilin şekli prerender.mjs'te denetlenir (anahtar + dizi uzunluğu). */

export const BENDIQ_PATH = '/bendiq'

export const MS_STORE_BENDIQ = 'https://apps.microsoft.com/detail/9N5NCGC9WX3Z'

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
        "Développé et perte au pli calibrés sur votre presse plieuse, ordre de pliage, contrôle de collision 4D, DXF, gabarit 1:1 et PDF. Android et Windows, essai 7 jours.",
    },
    hero: {
      eyebrow: 'BENDIQ · Pour les opérateurs de presse plieuse',
      title: 'Voyez la pièce pliée',
      accent: 'avant de découper la tôle',
      sub: "BENDIQ calcule le développé avec la perte au pli mesurée sur votre machine, cherche l'ordre de pliage et montre en 4D si une aile touche l'outil. Tout cela avant la découpe.",
      ctaPlay: 'Essayer 7 jours sur Google Play',
      ctaWindows: 'Version Windows',
      trust: ['Android · Google Play', 'Windows · Microsoft Store', 'Essai 7 jours sans carte bancaire', 'Résiliable à tout moment'],
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
    gallery: {
      eyebrow: "Dans l'application",
      title: 'Les écrans, tels quels',
      sub: "Captures de l'application Android dans votre langue. Les valeurs affichées sont un exemple de démonstration.",
      hint: 'Faites glisser pour voir les 7 écrans',
      alts: [
        "Simulation 4D : poinçon et matrice réels du catalogue, pli par pli.",
        "Calibrage : la perte au pli de votre machine à partir d'un pli d'essai mesuré.",
        "Collision détectée au pli 4 : l'aile C touche le poinçon à 7,3 mm, avant de découper la tôle.",
        'Écran principal : développé, longueur et poids affichés dès la saisie des cotes.',
        "Fiche de pliage pas à pas : angle, cote de butée et orientation de la pièce pour chaque pli.",
        'Développé prêt pour le laser : fichier DXF ou gabarit papier 1:1 issus du même calcul.',
        "Plan coté et PDF : l'atelier et le client reçoivent le même plan.",
      ],
    },
    platforms: {
      eyebrow: 'Sur quel écran',
      title: 'Android à la presse, Windows au bureau, le web ensuite',
      sub: 'Chaque version a son rôle. Les deux premières sont disponibles aujourd’hui.',
      available: 'Disponible',
      preparing: 'En préparation',
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
        lead: 'Le grand écran pour préparer la série : plusieurs pièces, plusieurs fichiers, un seul poste.',
        points: [
          'Liste de travail multi-pièces, PDF et DXF par lot',
          'Fichiers projet .bendiq : ouvrir, enregistrer, récents',
          'Fiche de réglage PDF depuis la 4D, une carte par pli',
          'Import de la table de calibrage depuis un CSV',
          "Stock de segments de l'atelier",
          '2D à côté de la 3D/4D, Ctrl+Z / Ctrl+Y',
        ],
        note: "Licence séparée de celle du téléphone. Avant d'acheter, vous voyez une fois gratuitement le résultat d'une pièce.",
        cta: 'Voir sur Microsoft Store',
        shotAlt: 'BENDIQ sur Windows : cotes à gauche, plan technique 2D coté à droite, boutons 3D, 4D, DXF, 1:1 et PDF.',
      },
      web: {
        title: 'Mode web',
        lead: "Pour l'iPhone, l'iPad et le Mac : BENDIQ dans le navigateur, sans installation.",
        points: [
          "Rien à installer : une adresse, et l'outil s'ouvre",
          'Le même compte Google que sur Android et Windows',
          'Vérifier un développé au bureau, en déplacement ou chez le client',
        ],
        note: "Pas encore disponible. Ce bloc décrit l'objectif, pas une fonction livrée.",
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
      ],
    },
    roadmap: {
      eyebrow: 'Feuille de route',
      title: 'Les 12 prochains mois',
      sub: "Ce qui est livré, ce qui arrive, ce qui est visé. Seules les fonctions « disponibles » sont dans la licence aujourd'hui.",
      phases: [
        {
          when: "Aujourd'hui",
          status: 'Disponible',
          items: [
            'Android sur Google Play, Windows sur Microsoft Store',
            'Perte au pli calibrée sur votre machine',
            '4D avec 621 outils du catalogue et contrôle de collision',
            'Mode opérateur pas à pas et décalage de butée arrière',
            'DXF R12, gabarit 1:1 et PDF',
          ],
        },
        {
          when: 'Prochaine mise à jour',
          status: 'Développé, en cours de publication',
          items: [
            "Accès entreprise et bêta : clé de licence liée à l'appareil, sans connexion Internet",
            'Liste des machines mise à jour : DURMA AD-S, Prima Power eP, HACO SynchroMaster, Boschert G-Bend',
          ],
        },
        {
          when: "D'ici 12 mois",
          status: 'Objectif',
          items: [
            "Mode web pour iPhone, iPad et Mac, dans le navigateur",
            'Nouveaux outils au catalogue à partir des DXF de matrices envoyés par les ateliers',
            'Nouvelles machines ajoutées à partir des demandes reçues',
          ],
        },
      ],
      origin: "Vos demandes comptent : le mode opérateur pas à pas et le décalage de butée arrière ont été ajoutés à la demande d'un utilisateur.",
      note: "Feuille de route indicative : l'ordre et les délais peuvent changer selon les retours d'atelier.",
    },
    faq: {
      title: 'Questions fréquentes',
      items: [
        { q: 'BENDIQ pilote-t-il ma presse plieuse ?', a: "Non. BENDIQ calcule, prépare et simule. Il ne se connecte pas à la machine et ne lui envoie aucun programme : vous reportez les valeurs vous-même." },
        { q: 'Le développé sera-t-il juste sur ma machine ?', a: "Les tables standard sont un point de départ. Mesurez un pli d'essai : BENDIQ enregistre la perte au pli de votre machine pour cette matière, cette épaisseur et ce V. Avant une série, un pli d'essai sur les pièces critiques reste nécessaire." },
        { q: 'Que puis-je faire sans licence ?', a: "Sur Android : 7 jours d'essai complet sans carte bancaire (connexion Google), puis le développé de 3 pièces par jour avec aperçu 2D/3D. Sur Windows : le résultat d'une pièce, une fois. Vos projets et calibrages ne sont pas supprimés." },
        { q: 'La licence du téléphone vaut-elle sur Windows ?', a: 'Non, Windows a sa propre licence. Un pack atelier réunit un ordinateur et un téléphone. Les prix sont affichés dans chaque store.' },
        { q: "Mon outil n'est pas dans le catalogue.", a: "Envoyez le DXF de votre matrice : nous le testons et l'ajoutons au catalogue." },
        { q: "Dans quelles langues ?", a: "L'application Android est en 16 langues, dont le français, l'anglais et le turc. La version Windows en propose 25." },
      ],
    },
    final: {
      title: 'Essayez-la sur votre prochaine pièce',
      sub: "7 jours d'essai complet sur Android, sans carte bancaire. Résiliable à tout moment.",
      ctaPlay: 'Essayer sur Google Play',
      ctaWindows: 'Version Windows',
      contact: 'Une question avant d’essayer ? Écrivez-nous',
    },
  },

  en: {
    meta: {
      title: 'BENDIQ — Press brake bending calculator and 4D simulation',
      description:
        'Flat pattern and bend deduction calibrated on your own press brake, bend sequence, 4D collision check, DXF, 1:1 template and PDF. Android and Windows, 7-day trial.',
    },
    hero: {
      eyebrow: 'BENDIQ · Built for press brake operators',
      title: 'See the bent part',
      accent: 'before you cut the sheet',
      sub: 'BENDIQ calculates the flat pattern with the bend deduction measured on your machine, finds the bend sequence and shows in 4D whether a flange hits the tooling. All before cutting.',
      ctaPlay: 'Try 7 days on Google Play',
      ctaWindows: 'Windows version',
      trust: ['Android · Google Play', 'Windows · Microsoft Store', '7-day trial, no credit card', 'Cancel anytime'],
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
    gallery: {
      eyebrow: 'Inside the app',
      title: 'The screens, as they are',
      sub: 'Screenshots of the Android app in your language. The values shown are a demo example.',
      hint: 'Swipe to see all 7 screens',
      alts: [
        '4D simulation: real catalogue punch and die, bend by bend.',
        'Calibration: your machine’s bend deduction from one measured test bend.',
        'Collision found on bend 4: flange C hits the punch at 7.3 mm, before the sheet is cut.',
        'Main screen: flat length, length and weight shown as soon as the dimensions are entered.',
        'Step-by-step bend card: angle, back gauge value and part orientation for every bend.',
        'Flat pattern ready for the laser: DXF file or 1:1 paper template from the same calculation.',
        'Dimensioned drawing and PDF: the shop floor and the customer get the same drawing.',
      ],
    },
    platforms: {
      eyebrow: 'On which screen',
      title: 'Android at the press, Windows at the desk, the web next',
      sub: 'Each version has its job. The first two are available today.',
      available: 'Available',
      preparing: 'In preparation',
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
        lead: 'The big screen to prepare a batch: several parts, several files, one workstation.',
        points: [
          'Multi-part job list, batch PDF and DXF',
          '.bendiq project files: open, save, recent',
          'PDF setup sheet from the 4D view, one card per bend',
          'Calibration table import from CSV',
          'Shop segment stock',
          '2D next to 3D/4D, Ctrl+Z / Ctrl+Y',
        ],
        note: 'Licensed separately from the phone. Before buying, you can see the result of one part once for free.',
        cta: 'View on Microsoft Store',
        shotAlt: 'BENDIQ on Windows: dimensions on the left, dimensioned 2D technical drawing on the right, 3D, 4D, DXF, 1:1 and PDF buttons.',
      },
      web: {
        title: 'Web mode',
        lead: 'For iPhone, iPad and Mac: BENDIQ in the browser, nothing to install.',
        points: [
          'Nothing to install: open an address and the tool starts',
          'The same Google account as on Android and Windows',
          'Check a flat pattern at the office, on the road or at the customer’s',
        ],
        note: 'Not available yet. This block describes the goal, not a shipped feature.',
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
      ],
    },
    roadmap: {
      eyebrow: 'Roadmap',
      title: 'The next 12 months',
      sub: 'What is shipped, what is coming, what we are aiming for. Only “available” features are part of the licence today.',
      phases: [
        {
          when: 'Today',
          status: 'Available',
          items: [
            'Android on Google Play, Windows on Microsoft Store',
            'Bend deduction calibrated on your machine',
            '4D with 621 catalogue tools and collision check',
            'Step-by-step operator mode and back gauge offset',
            'R12 DXF, 1:1 template and PDF',
          ],
        },
        {
          when: 'Next update',
          status: 'Built, being released',
          items: [
            'Company and beta access: licence key tied to the device, no internet connection needed',
            'Updated machine list: DURMA AD-S, Prima Power eP, HACO SynchroMaster, Boschert G-Bend',
          ],
        },
        {
          when: 'Within 12 months',
          status: 'Goal',
          items: [
            'Web mode for iPhone, iPad and Mac, in the browser',
            'New catalogue tools from die DXF files sent in by shops',
            'New machines added from the requests we receive',
          ],
        },
      ],
      origin: 'Your requests count: the step-by-step operator mode and the back gauge offset were added at a user’s request.',
      note: 'Indicative roadmap: order and timing may change with feedback from the shop floor.',
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        { q: 'Does BENDIQ control my press brake?', a: 'No. BENDIQ calculates, prepares and simulates. There is no link between BENDIQ and the machine, and no program is sent to it: you enter the values yourself.' },
        { q: 'Will the flat pattern be right on my machine?', a: 'Standard charts are a starting point. Measure one test bend: BENDIQ stores your machine’s bend deduction for that material, thickness and V. Before a batch, a test bend on critical parts is still needed.' },
        { q: 'What can I do without a licence?', a: 'On Android: a 7-day full trial without a credit card (Google sign-in), then the flat pattern of 3 parts a day with 2D/3D preview. On Windows: the result of one part, once. Your projects and calibrations are not deleted.' },
        { q: 'Does the phone licence work on Windows?', a: 'No, Windows has its own licence. A shop pack combines one computer and one phone. Prices are shown in each store.' },
        { q: 'My tool is not in the catalogue.', a: 'Send us your die’s DXF file: we test it and add it to the catalogue.' },
        { q: 'Which languages?', a: 'The Android app is available in 16 languages, including French, English and Turkish. The Windows version offers 25.' },
      ],
    },
    final: {
      title: 'Try it on your next part',
      sub: '7-day full trial on Android, no credit card. Cancel anytime.',
      ctaPlay: 'Try on Google Play',
      ctaWindows: 'Windows version',
      contact: 'A question before trying? Write to us',
    },
  },

  tr: {
    meta: {
      title: 'BENDIQ — Abkant büküm hesabı ve 4D simülasyon',
      description:
        'Kendi abkantınıza kalibre edilmiş açınım ve büküm payı, büküm sırası, 4D çarpışma kontrolü, DXF, 1:1 şablon ve PDF. Android ve Windows, 7 gün deneme.',
    },
    hero: {
      eyebrow: 'BENDIQ · Abkant operatörleri için',
      title: 'Bükülmüş parçayı görün,',
      accent: 'sacı sonra kesin',
      sub: 'BENDIQ açınımı kendi makinenizde ölçülen büküm payıyla hesaplar, büküm sırasını arar ve bir kanadın takıma çarpıp çarpmadığını 4D’de gösterir. Hepsi kesimden önce.',
      ctaPlay: "Google Play'de 7 gün deneyin",
      ctaWindows: 'Windows sürümü',
      trust: ['Android · Google Play', 'Windows · Microsoft Store', '7 gün deneme, kredi kartı yok', 'İstediğiniz an iptal'],
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
    gallery: {
      eyebrow: 'Uygulamanın içinden',
      title: 'Ekranlar, olduğu gibi',
      sub: 'Android uygulamasının kendi dilinizdeki ekran görüntüleri. Görünen değerler tanıtım örneğidir.',
      hint: '7 ekranı görmek için kaydırın',
      alts: [
        '4D simülasyon: gerçek katalog zımbası ve kalıbıyla, büküm büküm.',
        'Kalibrasyon: ölçülen tek deneme bükümünden makinenizin büküm payı.',
        '4. bükümde çarpışma: C kanadı zımbaya 7,3 mm’de değiyor, sac kesilmeden.',
        'Ana ekran: ölçüler girilince açınım, boy ve ağırlık hemen ekranda.',
        'Adım adım büküm kartı: her büküm için açı, arka dayama ölçüsü ve parçanın yönü.',
        'Lazere hazır açınım: aynı hesaptan DXF dosyası ya da 1:1 kâğıt şablon.',
        'Ölçülü teknik resim ve PDF: atölyeye ve müşteriye aynı çizim gider.',
      ],
    },
    platforms: {
      eyebrow: 'Hangi ekranda',
      title: 'Abkantın yanında Android, masada Windows, sırada web',
      sub: 'Her sürümün bir işi var. İlk ikisi bugün kullanılabilir.',
      available: 'Yayında',
      preparing: 'Hazırlanıyor',
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
        lead: 'Seri işi hazırlamak için büyük ekran: birden çok parça, birden çok dosya, tek masa.',
        points: [
          'Çok parçalı iş listesi, toplu PDF ve DXF',
          '.bendiq proje dosyaları: aç, kaydet, son kullanılanlar',
          '4D görünümden kurulum föyü PDF, her büküme bir kart',
          'Kalibrasyon tablosunu CSV’den içe aktarma',
          'Atölyenin segment stoğu',
          '2D, 3D/4D’nin yanında; Ctrl+Z / Ctrl+Y',
        ],
        note: 'Telefon lisansından ayrı lisanslanır. Satın almadan önce bir parçanın sonucunu bir kez ücretsiz görürsünüz.',
        cta: "Microsoft Store'da gör",
        shotAlt: 'Windows’ta BENDIQ: solda ölçüler, sağda ölçülendirilmiş 2D teknik resim; 3D, 4D, DXF, 1:1 ve PDF düğmeleri.',
      },
      web: {
        title: 'Web modu',
        lead: 'iPhone, iPad ve Mac için: kurulum gerektirmeden tarayıcıda BENDIQ.',
        points: [
          'Kurulum yok: adresi açın, araç başlasın',
          'Android ve Windows’taki aynı Google hesabı',
          'Açınımı ofiste, yolda ya da müşterinin yanında kontrol edin',
        ],
        note: 'Henüz yayında değil. Bu blok hedefi anlatır, teslim edilmiş bir özelliği değil.',
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
      ],
    },
    roadmap: {
      eyebrow: 'Yol haritası',
      title: 'Önümüzdeki 12 ay',
      sub: 'Teslim edilen, gelmek üzere olan ve hedeflenen. Bugün lisansa yalnız “yayında” olan özellikler dahildir.',
      phases: [
        {
          when: 'Bugün',
          status: 'Yayında',
          items: [
            "Android Google Play'de, Windows Microsoft Store'da",
            'Kendi makinenize kalibre edilmiş büküm payı',
            '621 katalog takımı ve çarpışma kontrolüyle 4D',
            'Adım adım operatör modu ve arka dayama ofseti',
            'R12 DXF, 1:1 şablon ve PDF',
          ],
        },
        {
          when: 'Sıradaki güncelleme',
          status: 'Geliştirildi, yayına çıkıyor',
          items: [
            'Firma ve beta erişimi: cihaza bağlı lisans anahtarı, internet bağlantısı gerekmeden',
            'Güncellenmiş makine listesi: DURMA AD-S, Prima Power eP, HACO SynchroMaster, Boschert G-Bend',
          ],
        },
        {
          when: '12 ay içinde',
          status: 'Hedef',
          items: [
            'iPhone, iPad ve Mac için tarayıcıda web modu',
            'Atölyelerin gönderdiği kalıp DXF’lerinden kataloğa yeni takımlar',
            'Gelen isteklere göre yeni makineler',
          ],
        },
      ],
      origin: 'İstekleriniz yön verir: adım adım operatör modu ve arka dayama ofseti bir kullanıcının isteğiyle eklendi.',
      note: 'Yol haritası yön göstericidir: sıra ve süre atölyeden gelen geri bildirime göre değişebilir.',
    },
    faq: {
      title: 'Sık sorulan sorular',
      items: [
        { q: 'BENDIQ abkantımı kumanda eder mi?', a: 'Hayır. BENDIQ hesaplar, hazırlar ve simüle eder. Makineyle bağlantısı yoktur, program göndermez: değerleri makineye siz girersiniz.' },
        { q: 'Açınım benim makinemde doğru çıkar mı?', a: 'Standart tablolar başlangıç noktasıdır. Bir deneme bükümü ölçün: BENDIQ o malzeme, kalınlık ve V için makinenizin büküm payını kaydeder. Seri üretimden önce kritik parçada deneme bükümü yine gerekir.' },
        { q: 'Lisans olmadan ne yapabilirim?', a: 'Android’de: kredi kartı istemeyen 7 gün tam deneme (Google girişi), sonra günde 3 parçanın açınımı ve 2D/3D önizleme. Windows’ta: bir parçanın sonucu, bir kez. Projeleriniz ve kalibrasyonlarınız silinmez.' },
        { q: 'Telefon lisansı Windows’ta geçer mi?', a: 'Hayır, Windows’un kendi lisansı var. Atölye paketi bir bilgisayar ile bir telefonu birleştirir. Fiyatlar her mağazada görünür.' },
        { q: 'Takımım katalogda yok.', a: 'Kalıbınızın DXF dosyasını gönderin: test edip kataloğa ekleyelim.' },
        { q: 'Hangi dillerde?', a: 'Android uygulaması Türkçe, Fransızca ve İngilizce dahil 16 dilde. Windows sürümü 25 dil sunar.' },
      ],
    },
    final: {
      title: 'Bir sonraki parçanızda deneyin',
      sub: 'Android’de 7 gün tam deneme, kredi kartı yok. İstediğiniz an iptal.',
      ctaPlay: "Google Play'de deneyin",
      ctaWindows: 'Windows sürümü',
      contact: 'Denemeden önce sorunuz mu var? Bize yazın',
    },
  },
}
