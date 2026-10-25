/* BENDIQ kullanım kılavuzu (/bendiq → #kilavuz) — metin tek kaynak.

   Kaynak (2026-10-25): ozer-bend-pro1 main 2aaefba, uygulamanın kendisi.
   - Kareler gerçek Android arayüzünden (yerel geliştirme sunucusu, 384×832,
     dile göre) çekildi; numaralı işaretlerin yeri bendiqGuideMarkers.js'te.
     Çekim sırasında abonelik kapısı geçici kapatıldı ve eski (v1) lisans
     kartı gizlendi — gerçek uygulamada o yerde abonelik kartı durur, kılavuz
     o karta değinmez.
   - Tuş adları uygulamanın kendi çeviri dosyalarından (src/i18n/*) alındı;
     uygulamada bir etiket değişirse burası da üç dilde güncellenir.
   - Kalibrasyon: calibration.js bdFromTestBend → BD = a + b − L (üçü > 0,
     sonuç > 0, ≤ 200 mm); kayıt anahtarı malzeme | kalınlık | açı | V
     (dokunulmaz). Örnek değerler kılavuz için girildi: L 100, a 51,7,
     b 51,8 → 3,50 mm / büküm.
   - 4D: alt + üst kalıp katalogdan seçili olmalı (viewer3d.jsx). Arka
     dayama ofseti FL / BD / PDF / DXF'i değiştirmez (GaugeCalPanel).
   Yazılmayanlar (bilerek): kare kare süre, "hatasız", makineye bağlantı.
   Üç dilin şekli prerender.mjs'te denetlenir (anahtar + dizi uzunluğu,
   kare dosyaları, işaret sayısı ↔ madde sayısı). */

export const GUIDE_SHOT_W = 576
export const GUIDE_SHOT_H = 1248
export const guideSrc = (lang, key) => `/bendiq/kilavuz/${lang}/${key}.webp`

/* Kalibrasyon turundaki atölye adımlarının çizimleri (BendiqGuide.jsx). */
export const GUIDE_DIAGRAMS = ['strip', 'bend', 'measure', 'formula']

export const bendiqGuide = {
  fr: {
    head: {
      eyebrow: "Mode d'emploi",
      title: "De la première ouverture à la première pièce",
      sub: "Chaque bouton expliqué sur les vrais écrans de l'application Android. Les numéros sur la capture renvoient à la liste. Les valeurs affichées sont un exemple.",
    },
    ui: {
      tabs: 'Chapitres du mode d’emploi',
      screen: 'Écran {i} sur {n}',
      prev: 'Écran précédent',
      next: 'Écran suivant',
      shotAlt: "{t} — capture de l'application BENDIQ",
    },
    chapters: [
      {
        id: 'demarrer',
        tab: 'Démarrer',
        intro: "Au lancement, l'écran du logo reste quelques secondes ; touchez-le pour passer. À la première ouverture, connectez-vous avec votre compte Google : 7 jours d'essai complet, sans carte bancaire. L'écran principal s'ouvre ensuite.",
        screens: [
          {
            shot: 'g01_home',
            title: 'Écran principal',
            items: [
              "Barre de résultat : FL (largeur à découper), L (longueur) et poids. Elle change dès que vous saisissez une cote ; elle se masque quand vous faites défiler vers le bas et revient vers le haut.",
              "Bandeau de réglage : déduction utilisée (BD), matière et épaisseur, matrice, machine, poinçon. Touchez-le pour ouvrir les Réglages.",
              "Favoris · Ajouter aux favoris · Historique : enregistrez une pièce sous un nom, rouvrez un travail précédent.",
              "Modèle de profil : la forme de la pièce (écran suivant).",
              "Outils : Dessin Libre, Scan de mesures par IA (cotes depuis une photo, saisie à la voix), Calculateur de poids, Implantation des trous, Platine prête.",
            ],
          },
          {
            shot: 'g02_profiles',
            title: 'Modèle de profil',
            items: [
              "Tôle plate, profil C à lèvres, cornière (L), profil en U, profil Z, profil oméga : formes prêtes, vous saisissez seulement les cotes.",
              'Profil général : une forme hors liste, construite segment par segment.',
              'Cône : ouvre un outil de développé de cône en plein écran.',
            ],
          },
        ],
      },
      {
        id: 'cotes',
        tab: 'Cotes et plan',
        intro: "Touchez chaque champ et tapez la valeur ; la lettre du champ est la même aile que sur le plan 2D. Une aile à 0 est considérée absente et son pli n'est pas compté (C à lèvres avec A et B à 0 → profil en U).",
        screens: [
          {
            shot: 'g04_draw',
            title: 'Cotes, plan 2D et sorties',
            items: [
              '3D : la pièce au vrai rayon, à tourner et zoomer.',
              '4D : la presse complète, pli par pli (chapitre 5).',
              "Plan 2D coté : touchez-le pour l'ouvrir en grand.",
              'DXF : développé pour la découpe laser ou plasma.',
              "1:1 : gabarit à taille réelle sur A4 ; imprimez, posez sur la tôle, tracez.",
              "PDF : ouvre d'abord l'aperçu du devis (chapitre 7).",
              'PARTAGER : envoyez le PDF par message ou par e-mail.',
            ],
          },
        ],
      },
      {
        id: 'reglages',
        tab: 'Réglages',
        intro: "Touchez le bandeau de réglage sous la bannière. Tout ce qui change le calcul est ici ; « Fermer les réglages » ramène à l'écran principal.",
        screens: [
          {
            shot: 'g05_settings',
            title: 'Réglages',
            items: [
              "Langue : 16 langues, appliquée tout de suite.",
              'Matière : acier doux, galvanisé, inox 304 / 316, aluminium 1050 / 5754, Hardox.',
              "Épaisseur : une ligne en rouge est hors des limites catalogue de l'outil choisi.",
              "Machine : la presse dessinée en 4D. Elle ne change pas le calcul de la déduction.",
              "Matrice (catalogue) : son ouverture V entre dans le calcul. Plus bas : poinçon et porte-outils ; pour la 4D, matrice et poinçon doivent venir du catalogue.",
            ],
          },
        ],
      },
      {
        id: 'calibrage',
        tab: 'Calibrage',
        calib: true,
        intro: "Une table standard ne connaît pas votre presse. Vous mesurez un pli d'essai ; BENDIQ enregistre la déduction (BD) pour cette matière + épaisseur + matrice (V) + angle et l'utilise ensuite sur chaque pièce.",
        screens: [],
      },
      {
        id: 'machine',
        tab: 'Mesurer la machine',
        measure: true,
        intro: "Le contrôle de collision 4D ne connaît pas votre presse tant que vous ne lui donnez pas ses cotes : sans elles, il affiche « non contrôlé », jamais « pas de collision ». Mesurez votre presse une fois au mètre ruban, 19 cotes guidées une par une ; la 4D dit ensuite, pour les parties mesurées, si une aile touche le tablier, la table ou le bâti.",
        screens: [],
      },
      {
        id: '4d',
        tab: '4D et collision',
        intro: "Pour la 4D, une matrice et un poinçon doivent être choisis dans le catalogue (Réglages). Sinon, un bouton « Choisir les outils » vous y conduit directement. Glissez pour tourner, deux doigts pour zoomer.",
        screens: [
          {
            shot: 'g07_4d',
            title: 'Simulation 4D',
            items: [
              "Repère d'étape : tôle à plat, numéro du pli et aile ; indique aussi quand retourner la pièce.",
              "Résumé de collision : collision ou non, et zones non contrôlées. Touchez-le pour ouvrir les Détails.",
              "Pas à pas (fiche opérateur), Butée (étalonnage de la butée arrière), Retourner le poinçon, Terminer (pièce finie).",
              "Curseur : avancez ou reculez entre les plis.",
              "Pli précédent, lecture / pause, pli suivant, recommencer, vitesse (½× 1× 2×), centre de rotation.",
            ],
          },
          {
            shot: 'g08_check',
            title: 'Détails du contrôle',
            items: [
              "Outils utilisés, collisions éventuelles et zones non contrôlées. Les lignes en jaune disent quelle cote machine ou outil manque, et où la saisir.",
              'Fermer.',
            ],
          },
        ],
      },
      {
        id: 'pas-a-pas',
        tab: 'Pas à pas',
        intro: "Dans la 4D, touchez « Pas à pas ». Un encadré jaune signale quand retourner la pièce ou la tourner de 180°. « Précédent » / « Suivant » pour avancer. Au dernier pli : « Pièce terminée » et « Étalonner » pour enregistrer un décalage de butée arrière à partir des ailes mesurées. Ce décalage s'ajoute seulement à la cote de butée : FL, BD, PDF et DXF ne changent pas.",
        screens: [
          {
            shot: 'g09_fold',
            title: 'Fiche opérateur',
            items: [
              "Pli 2/4 · B : le pli en cours et l'aile. « Vue de côté » / « Vue libre » change la caméra.",
              'Angle.',
              'Sens : comme le pli 1, ou inverse.',
              "Butée arrière · aile B : l'aile qui s'appuie sur la butée et la cote, depuis l'axe de la matrice (milieu du V).",
            ],
          },
        ],
      },
      {
        id: 'sorties',
        tab: 'PDF et partage',
        intro: "DXF et 1:1 sont sur l'écran principal, sous le plan (chapitre 2) ; le fichier de découpe demande la longueur L de la pièce. Le nom et le logo de l'entreprise se règlent aussi dans les Réglages.",
        screens: [
          {
            shot: 'g10_offer',
            title: 'Aperçu du devis',
            items: [
              "Logo et nom de votre entreprise, plan coté. « Créer le PDF » produit le fichier, « Partager » l'envoie.",
            ],
          },
        ],
      },
    ],
    calib: {
      cta: 'Ouvrir le calibrage en plein écran',
      ctaSub: "13 étapes : la mesure à l'atelier, puis l'enregistrement dans l'application",
      summary: [
        'Coupez une bande et mesurez sa longueur (L).',
        'Faites un seul pli.',
        "Mesurez les deux ailes depuis l'angle extérieur (a, b).",
        "Saisissez L, a et b dans l'assistant de pli d'essai.",
        'Enregistrez : le bandeau affiche « mesuré ».',
      ],
      preview: 'k04_result',
      title: "Calibrage — pas à pas",
      close: 'Fermer',
      prev: 'Retour',
      next: 'Suivant',
      finish: 'Terminer',
      step: 'Étape {i} sur {n}',
      shop: "À l'atelier",
      app: "Dans l'application",
      labels: { cut: 'longueur coupée', outer: 'angle extérieur', line: 'ligne de pli', example: 'Exemple' },
      steps: [
        {
          tag: 'shop',
          shot: 'g05_settings',
          title: 'Faites correspondre le réglage',
          text: "Prenez la même matière que la pièce à produire (le même lot si possible), la même épaisseur. Sur la presse, montez la matrice (V) et le poinçon de cette pièce. Dans les Réglages, choisissez la même matière, la même épaisseur et la même matrice ; l'angle est celui du pli affiché. L'enregistrement est lié à ces quatre valeurs.",
          items: ['Langue : sans effet sur le calcul.', 'Matière : celle de la bande d’essai.', 'Épaisseur : celle de la bande d’essai.', 'Machine : sans effet sur la déduction.', 'Matrice : la même V que sur la presse.'],
        },
        {
          tag: 'shop',
          diagram: 'strip',
          title: 'Coupez la bande, mesurez L',
          text: "Coupez une bande droite, sans bavure. Mesurez sa longueur après la coupe, au pied à coulisse ou au réglet : c'est L (par exemple 100 mm). Notez la valeur mesurée, pas celle de la liste de débit : une erreur sur L passe telle quelle dans la déduction. Les deux ailes doivent tenir sur la matrice et se mesurer facilement au pied à coulisse.",
          items: [],
        },
        {
          tag: 'shop',
          diagram: 'bend',
          title: 'Faites un seul pli',
          text: "Pliez la bande une fois, près du milieu, à l'angle choisi dans l'application (par exemple 90°). Contrôlez l'angle au rapporteur : s'il n'est pas atteint, corrigez d'abord l'angle et prenez la mesure sur une pièce à l'angle juste.",
          items: [],
        },
        {
          tag: 'shop',
          diagram: 'measure',
          title: "Mesurez les ailes depuis l'angle extérieur : a et b",
          text: "Appuyez le pied à coulisse du bout d'une aile jusqu'à la face EXTÉRIEURE de l'autre aile : c'est a. Faites de même pour l'autre aile : b. Ne mesurez ni depuis la face intérieure ni depuis le début du rayon. Gardez les décimales (par exemple 51,7 et 51,8).",
          items: [],
        },
        {
          tag: 'shop',
          diagram: 'formula',
          title: 'Contrôle : a + b est plus grand que L',
          text: "La déduction vaut BD = a + b − L. Exemple : 51,7 + 51,8 − 100 = 3,50 mm. Si a + b est plus petit que L, les ailes ont été mesurées par l'intérieur : recommencez la mesure. L'application fait le calcul ; cette étape sert seulement à vérifier.",
          items: [],
        },
        {
          tag: 'app',
          shot: 'k01_bdcard',
          title: 'Trouvez la carte BD',
          text: 'Touchez le bandeau de réglage, puis faites défiler les Réglages vers le bas.',
          items: [
            'BD auto : la déduction du réglage actuel, et le réglage concerné.',
            'Interrupteur « BD manuel ».',
          ],
        },
        {
          tag: 'app',
          shot: 'k02_manual',
          title: 'Activez « BD manuel »',
          text: "Un champ apparaît pour saisir une valeur à la main. En dessous, l'assistant calcule cette valeur pour vous.",
          items: ['« BD manuel » activé.', "Touchez « Assistant de pli d'essai »."],
        },
        {
          tag: 'app',
          shot: 'k03_wizard',
          title: 'Saisissez vos mesures',
          text: "Tapez les trois valeurs mesurées à l'atelier.",
          items: [
            'Longueur coupée L (mm) : la longueur mesurée de la bande.',
            'Aile a (mm).',
            "Aile b (mm) : les deux ailes mesurées depuis l'angle extérieur.",
          ],
        },
        {
          tag: 'app',
          shot: 'k04_result',
          title: 'Vérifiez le résultat',
          text: "Si les mesures ne donnent pas de valeur valable, l'application rappelle de mesurer les ailes depuis l'angle extérieur.",
          items: [
            'Les valeurs saisies.',
            'Déduction mesurée : a + b − L (ici 3,50 mm / pli).',
            "« Utiliser et enregistrer » : place la valeur dans BD manuel et propose de l'enregistrer.",
          ],
        },
        {
          tag: 'app',
          shot: 'k05_ask',
          title: "Confirmez l'enregistrement",
          text: "Si la valeur s'écarte fortement de la formule (erreur de virgule par exemple), un avertissement en gras s'affiche : vérifiez la mesure avant d'enregistrer.",
          items: [
            "La question rappelle pour quel réglage la valeur sera enregistrée : matière, épaisseur, angle et V.",
            '« Oui, enregistrer » : elle devient la référence permanente de ce réglage.',
            "« Non » : rien n'est enregistré ; la valeur sert tant que BD manuel reste activé.",
          ],
        },
        {
          tag: 'app',
          shot: 'k06_measured',
          title: 'Désactivez « BD manuel »',
          text: 'Chaque pièce saisie avec ce réglage est maintenant calculée avec votre déduction ; FL change en conséquence.',
          items: [
            'BD auto affiche désormais votre valeur (3,50).',
            "Badge « mesuré » : la valeur vient de votre mesure, pas de la formule.",
          ],
        },
        {
          tag: 'app',
          shot: 'k08_strip',
          title: "Contrôlez sur l'écran principal",
          text: "Si « mesuré » n'apparaît pas, il n'y a pas d'enregistrement pour ce réglage : la matière, l'épaisseur, la matrice ou l'angle diffère.",
          items: ['Bandeau de réglage : « BD 3.50 mm / pli mesuré ». Le calcul utilise votre propre mesure.'],
        },
        {
          tag: 'app',
          shot: 'k07_list',
          title: 'Gérez les mesures enregistrées',
          text: "Réglages › Mesures enregistrées. Il n'y a pas de modification : une nouvelle mesure pour le même réglage remplace l'ancienne.",
          items: [
            'Chaque ligne : déduction — matière • épaisseur • angle • V.',
            'Supprimer : retire la ligne (confirmation demandée, définitif).',
            "Exporter : toutes les mesures dans un fichier (.bqcal), pour une sauvegarde ou un autre téléphone.",
            'Importer : ajoute les mesures du fichier ; vous gardez les existantes ou vous les remplacez.',
          ],
        },
      ],
      tips: {
        title: 'Bon à savoir',
        items: [
          "Chaque réglage est un enregistrement : même tôle avec une autre matrice ou un autre angle, mesurez un pli d'essai pour ce réglage aussi. L'écran « Couverture » montre les angles déjà mesurés.",
          "Le lot de matière, le sens de laminage et l'usure de l'outil comptent : mesurez à nouveau quand le lot change.",
          "En profil général, si les angles diffèrent, une seule mesure ne s'applique pas à tous : l'application n'enregistre pas.",
          "Sur une pièce critique, un pli d'essai reste la règle avant la série.",
        ],
        more: 'La méthode en détail : mesurer la perte au pli avec un pli d’essai',
      },
    },
    end: {
      text: "Le plus simple pour apprendre : refaire ces étapes sur votre prochaine pièce.",
      cta: 'Essayer 7 jours sur Google Play',
    },
  },

  en: {
    head: {
      eyebrow: 'User guide',
      title: 'From first launch to your first part',
      sub: 'Every button explained on the real screens of the Android app. The numbers on each screenshot match the list. The values shown are an example.',
    },
    ui: {
      tabs: 'User guide chapters',
      screen: 'Screen {i} of {n}',
      prev: 'Previous screen',
      next: 'Next screen',
      shotAlt: '{t} — BENDIQ app screenshot',
    },
    chapters: [
      {
        id: 'demarrer',
        tab: 'Getting started',
        intro: 'At launch the logo screen stays for a few seconds; tap it to skip. The first time, sign in with your Google account: a 7-day full trial, no credit card. The main screen opens next.',
        screens: [
          {
            shot: 'g01_home',
            title: 'Main screen',
            items: [
              'Result bar: FL (flat width to cut), L (length) and weight. It updates as soon as you enter a dimension; it hides when you scroll down and comes back when you scroll up.',
              'Setup strip: the bend deduction in use (BD), material and thickness, die, machine, punch. Tap it to open Settings.',
              'Favorites · Add to Favorites · History: save a part under a name, reopen an earlier job.',
              'Profile Template: the shape of the part (next screen).',
              'Tools: Free Draw, AI Measurement Scan (dimensions from a photo, voice input), Weight Calculator, Hole Layout, Ready plate.',
            ],
          },
          {
            shot: 'g02_profiles',
            title: 'Profile Template',
            items: [
              'Flat plate, lipped C, corner (L), U channel, Z step, hat (omega): ready shapes, you only enter the dimensions.',
              'General profile: a shape not in the list, built segment by segment.',
              'Cone: opens a full-screen cone flat pattern tool.',
            ],
          },
        ],
      },
      {
        id: 'cotes',
        tab: 'Dimensions',
        intro: 'Tap each field and type the value; the field letter is the same flange as on the 2D drawing. A flange set to 0 is treated as absent and its bend is not counted (lipped C with A and B at 0 → U channel).',
        screens: [
          {
            shot: 'g04_draw',
            title: 'Dimensions, 2D drawing and outputs',
            items: [
              '3D: the part at the real radius, to rotate and zoom.',
              '4D: the full press brake, bend by bend (chapter 5).',
              'Dimensioned 2D drawing: tap it to open it full size.',
              'DXF: flat pattern for laser or plasma cutting.',
              '1:1: a full-size template on A4; print it, lay it on the sheet, mark through.',
              'PDF: opens the quote preview first (chapter 7).',
              'SHARE: send the PDF by message or e-mail.',
            ],
          },
        ],
      },
      {
        id: 'reglages',
        tab: 'Settings',
        intro: 'Tap the setup strip below the banner. Everything that changes the calculation is here; “Close Settings” takes you back to the main screen.',
        screens: [
          {
            shot: 'g05_settings',
            title: 'Settings',
            items: [
              'Language: 16 languages, applied at once.',
              'Material: mild steel, galvanised, stainless 304 / 316, aluminium 1050 / 5754, Hardox.',
              'Sheet Thickness: a row in red is outside the catalogue limits of the selected tool.',
              'Machine: the press brake drawn in 4D. It does not change the bend deduction.',
              'Die (catalogue): its V opening goes into the calculation. Further down: punch and holders; for 4D, both die and punch must come from the catalogue.',
            ],
          },
        ],
      },
      {
        id: 'calibrage',
        tab: 'Calibration',
        calib: true,
        intro: 'A standard chart does not know your press brake. You measure one test bend; BENDIQ stores the bend deduction (BD) for that material + thickness + die (V) + angle and uses it on every part after that.',
        screens: [],
      },
      {
        id: 'machine',
        tab: 'Measure the machine',
        measure: true,
        intro: 'The 4D collision check does not know your press brake until you give it its dimensions: without them it shows “not checked”, never “no collision”. Measure your press brake once with a tape measure, 19 guided dimensions one by one; the 4D then tells you, for the measured parts, whether a flange touches the beam, the bed or the frame.',
        screens: [],
      },
      {
        id: '4d',
        tab: '4D and collision',
        intro: 'For 4D, a die and a punch must be selected from the catalogue (Settings). If not, a “Select tools” button takes you straight there. Drag to rotate, two fingers to zoom.',
        screens: [
          {
            shot: 'g07_4d',
            title: '4D simulation',
            items: [
              'Step badge: flat blank, bend number and flange; it also says when to flip the part.',
              'Collision summary: collision or not, and the zones that were not checked. Tap it to open Details.',
              'Step by step (operator card), Gauge (back gauge calibration), Turn punch, Finish (finished part).',
              'Slider: move back and forth between bends.',
              'Previous bend, play / pause, next bend, restart, speed (½× 1× 2×), rotation centre.',
            ],
          },
          {
            shot: 'g08_check',
            title: 'Check details',
            items: [
              'Tooling used, any collisions and the zones not checked. Lines in yellow say which machine or tool dimension is missing and where to enter it.',
              'Close.',
            ],
          },
        ],
      },
      {
        id: 'pas-a-pas',
        tab: 'Step by step',
        intro: 'In 4D, tap “Step by step”. A yellow box tells you when to flip the part or turn it 180°. Use “Previous” / “Next” to move on. On the last bend: “Part finished” and “Calibrate” to save a back gauge offset from the flanges you measured. The offset is only added to the gauge value: FL, BD, PDF and DXF do not change.',
        screens: [
          {
            shot: 'g09_fold',
            title: 'Operator card',
            items: [
              'Bend 2/4 · B: the current bend and flange. “Side view” / “Free view” switches the camera.',
              'Angle.',
              'Direction: same as bend 1, or opposite.',
              'Back gauge · flange B: the flange that rests on the gauge, and the value, from the die centre (V middle).',
            ],
          },
        ],
      },
      {
        id: 'sorties',
        tab: 'PDF and sharing',
        intro: 'DXF and 1:1 are on the main screen, below the drawing (chapter 2); the cutting file needs the part length L. The company name and logo can also be set in Settings.',
        screens: [
          {
            shot: 'g10_offer',
            title: 'Quote preview',
            items: ['Your company logo and name, dimensioned drawing. “Create PDF” makes the file, “Share” sends it.'],
          },
        ],
      },
    ],
    calib: {
      cta: 'Open calibration full screen',
      ctaSub: '13 steps: the measurement in the shop, then saving it in the app',
      summary: [
        'Cut a strip and measure its length (L).',
        'Make one single bend.',
        'Measure both flanges from the outside corner (a, b).',
        'Enter L, a and b in the Test Bend Wizard.',
        'Save it: the setup strip shows “measured”.',
      ],
      preview: 'k04_result',
      title: 'Calibration — step by step',
      close: 'Close',
      prev: 'Back',
      next: 'Next',
      finish: 'Done',
      step: 'Step {i} of {n}',
      shop: 'In the shop',
      app: 'In the app',
      labels: { cut: 'cut length', outer: 'outside corner', line: 'bend line', example: 'Example' },
      steps: [
        {
          tag: 'shop',
          shot: 'g05_settings',
          title: 'Match the setup',
          text: 'Use the same material as the part you will make (the same batch if you can) and the same thickness. On the press, fit the die (V) and punch for that part. In Settings, pick the same material, thickness and die; the angle is the bend angle on screen. The saved value is tied to these four.',
          items: ['Language: no effect on the calculation.', 'Material: that of the test strip.', 'Thickness: that of the test strip.', 'Machine: no effect on the deduction.', 'Die: the same V as on the press.'],
        },
        {
          tag: 'shop',
          diagram: 'strip',
          title: 'Cut the strip, measure L',
          text: 'Cut a straight strip with no burr. Measure its length after cutting, with a calliper or steel rule: that is L (for example 100 mm). Write down the measured value, not the one on the cut list: any error in L goes straight into the deduction. Both flanges must sit on the die and be easy to measure with a calliper.',
          items: [],
        },
        {
          tag: 'shop',
          diagram: 'bend',
          title: 'Make one single bend',
          text: 'Bend the strip once, near the middle, at the angle set in the app (for example 90°). Check the angle with a protractor: if it is off, correct the angle first and take the measurement on a part at the right angle.',
          items: [],
        },
        {
          tag: 'shop',
          diagram: 'measure',
          title: 'Measure the flanges from the outside corner: a and b',
          text: 'Set the calliper from the tip of one flange to the OUTSIDE face of the other flange: that is a. Do the same for the other flange: b. Do not measure from the inside face or from where the radius starts. Keep the decimals (for example 51.7 and 51.8).',
          items: [],
        },
        {
          tag: 'shop',
          diagram: 'formula',
          title: 'Check: a + b is larger than L',
          text: 'The bend deduction is BD = a + b − L. Example: 51.7 + 51.8 − 100 = 3.50 mm. If a + b is smaller than L, the flanges were measured on the inside: measure again. The app does the maths; this step is only a check.',
          items: [],
        },
        {
          tag: 'app',
          shot: 'k01_bdcard',
          title: 'Find the BD card',
          text: 'Tap the setup strip, then scroll down in Settings.',
          items: ['Auto BD: the deduction for the current setup, and the setup it applies to.', '“Manual BD” switch.'],
        },
        {
          tag: 'app',
          shot: 'k02_manual',
          title: 'Turn on “Manual BD”',
          text: 'A field appears to type a value by hand. Below it, the wizard calculates that value for you.',
          items: ['“Manual BD” on.', 'Tap “Test Bend Wizard”.'],
        },
        {
          tag: 'app',
          shot: 'k03_wizard',
          title: 'Enter your measurements',
          text: 'Type the three values measured in the shop.',
          items: [
            'Cut length L (mm): the measured length of the strip.',
            'Leg a (mm).',
            'Leg b (mm): both flanges measured from the outside corner.',
          ],
        },
        {
          tag: 'app',
          shot: 'k04_result',
          title: 'Check the result',
          text: 'If the measurements do not give a valid value, the app reminds you to measure the flanges from the outside corner.',
          items: [
            'The values you entered.',
            'Measured bend deduction: a + b − L (here 3.50 mm / bend).',
            '“Use and save”: puts the value into Manual BD and offers to save it.',
          ],
        },
        {
          tag: 'app',
          shot: 'k05_ask',
          title: 'Confirm the save',
          text: 'If the value is far from the formula (a misplaced decimal point, for example), a warning in bold appears: check the measurement before saving.',
          items: [
            'The question says which setup the value is saved for: material, thickness, angle and V.',
            '“Yes, save”: it becomes the permanent reference for that setup.',
            '“No”: nothing is saved; the value is used while Manual BD stays on.',
          ],
        },
        {
          tag: 'app',
          shot: 'k06_measured',
          title: 'Turn off “Manual BD”',
          text: 'Every part entered with this setup is now calculated with your deduction; FL changes accordingly.',
          items: ['Auto BD now shows your value (3.50).', '“measured” badge: the value comes from your measurement, not the formula.'],
        },
        {
          tag: 'app',
          shot: 'k08_strip',
          title: 'Check on the main screen',
          text: 'If “measured” does not appear, there is no saved value for this setup: the material, thickness, die or angle is different.',
          items: ['Setup strip: “BD 3.50 mm / bend measured”. The calculation uses your own measurement.'],
        },
        {
          tag: 'app',
          shot: 'k07_list',
          title: 'Manage saved measurements',
          text: 'Settings › Saved Measurements. There is no edit: a new measurement for the same setup replaces the old one.',
          items: [
            'Each row: deduction — material • thickness • angle • V.',
            'Delete: removes the row (asks for confirmation, permanent).',
            'Export: all measurements in one file (.bqcal), as a backup or for another phone.',
            'Import: adds the measurements from a file; keep the existing ones or overwrite them.',
          ],
        },
      ],
      tips: {
        title: 'Good to know',
        items: [
          'Each setup is its own record: same sheet with another die or another angle, measure a test bend for that setup too. The “Coverage” screen shows which angles are already measured.',
          'Material batch, rolling direction and tool wear all matter: measure again when the batch changes.',
          'In a general profile with different angles, one measurement cannot apply to all of them: the app does not save it.',
          'On a critical part, a test bend is still the rule before production.',
        ],
        more: 'The method in detail: measuring bend deduction with one test bend',
      },
    },
    end: {
      text: 'The easiest way to learn: repeat these steps on your next part.',
      cta: 'Try 7 days on Google Play',
    },
  },

  tr: {
    head: {
      eyebrow: 'Kullanım kılavuzu',
      title: 'İlk açılıştan ilk parçaya, adım adım',
      sub: 'Her tuş, Android uygulamasının gerçek ekranları üzerinde anlatılır. Ekrandaki numaralar listedeki maddeyi gösterir. Görünen değerler örnektir.',
    },
    ui: {
      tabs: 'Kılavuz bölümleri',
      screen: 'Ekran {i} / {n}',
      prev: 'Önceki ekran',
      next: 'Sonraki ekran',
      shotAlt: '{t} — BENDIQ uygulama ekranı',
    },
    chapters: [
      {
        id: 'demarrer',
        tab: 'İlk açılış',
        intro: 'Açılışta logo ekranı birkaç saniye görünür; dokununca geçer. İlk açılışta Google hesabınızla giriş yaparsınız: 7 gün tam deneme, kart bilgisi istenmez. Ardından ana ekran açılır.',
        screens: [
          {
            shot: 'g01_home',
            title: 'Ana ekran',
            items: [
              'Sonuç çubuğu: FL (kesilecek en), L (boy) ve ağırlık. Ölçüyü girdiğiniz anda değişir; aşağı kaydırınca gizlenir, yukarı kaydırınca geri gelir.',
              'Kurulum şeridi: kullanılan büküm payı (BD), malzeme ve kalınlık, alt kalıp, makine, zımba. Dokununca Ayarlar açılır.',
              'Favoriler · Favoriye Ekle · Geçmiş: parçayı adıyla kaydedin, önceki işi geri açın.',
              'Profil Şablonu: parçanın şekli (sonraki ekran).',
              'Araçlar: Serbest Çizim, Yapay Zeka ile Ölçü Tarama (fotoğraftan ölçü, sesle ölçü girişi), Ağırlık Hesapla, Delik Yerleşimi, Hazır plaka.',
            ],
          },
          {
            shot: 'g02_profiles',
            title: 'Profil şablonu',
            items: [
              'Düz plaka, Dudaklı C, Köşebent (L), U kanal, Basamak Z, Şapka (Omega): hazır şekiller, yalnız ölçüleri girersiniz.',
              'Genel Profil: listede olmayan şekli kenar kenar (segment) kurarsınız.',
              'Koni: tam ekran koni açınım aracı açılır.',
            ],
          },
        ],
      },
      {
        id: 'cotes',
        tab: 'Ölçü ve çizim',
        intro: 'Her alana dokunup değeri yazın; alanın harfi 2D çizimdeki kanatla aynıdır. 0 girilen kanat yok sayılır, o büküm atlanır (Dudaklı C’de A ve B = 0 → U kanal).',
        screens: [
          {
            shot: 'g04_draw',
            title: 'Ölçüler, 2D çizim ve çıktılar',
            items: [
              '3D: parça gerçek radüsle; döndürün, yakınlaştırın.',
              '4D: abkantın tamamı, büküm büküm (5. bölüm).',
              'Ölçülü 2D çizim: dokununca büyük açılır.',
              'DXF: lazer ya da plazma kesim için açınım.',
              '1:1: A4’te gerçek boyda şablon; yazdırın, sacın üzerine koyun, çizin.',
              'PDF: önce teklif önizlemesi açılır (7. bölüm).',
              'PAYLAŞ: PDF’i mesajla ya da e-postayla gönderin.',
            ],
          },
        ],
      },
      {
        id: 'reglages',
        tab: 'Ayarlar',
        intro: 'Bannerın altındaki kurulum şeridine dokunun. Hesabı değiştiren her şey buradadır; “Ayarları Kapat” ana ekrana döndürür.',
        screens: [
          {
            shot: 'g05_settings',
            title: 'Ayarlar',
            items: [
              'Dil: 16 dil, hemen uygulanır.',
              'Malzeme: DKP, galvaniz, paslanmaz 304 / 316, alüminyum 1050 / 5754, Hardox.',
              'Sac Kalınlığı: kırmızı satır, seçili takımın katalog sınırlarının dışındadır.',
              'Makine: 4D’de çizilen abkant. Büküm payı hesabını değiştirmez.',
              'Alt kalıp (katalog): V açıklığı hesaba girer. Aşağıda üst kalıp (zımba) ve tutucular; 4D için alt ve üst kalıp katalogdan seçilmiş olmalı.',
            ],
          },
        ],
      },
      {
        id: 'calibrage',
        tab: 'Kalibrasyon',
        calib: true,
        intro: 'Standart tablo sizin abkantınızı bilmez. Bir deneme bükümü ölçersiniz; BENDIQ o malzeme + kalınlık + alt kalıp (V) + açı için büküm payını (BD) kaydeder ve sonraki her parçada kullanır.',
        screens: [],
      },
      {
        id: 'machine',
        tab: 'Makineyi ölç',
        measure: true,
        intro: '4D çarpışma kontrolü, ölçülerini vermediğiniz sürece abkantınızı bilmez: ölçü yoksa “kontrol edilmedi” der, asla “çarpışma yok” demez. Abkantınızı bir kez şerit metreyle ölçün, 19 ölçü tek tek rehberli; 4D sonra ölçülen parçalar için kanadın kirişe, tablaya ya da gövdeye değip değmediğini söyler.',
        screens: [],
      },
      {
        id: '4d',
        tab: '4D ve çarpışma',
        intro: '4D için Ayarlar’da alt kalıp ve zımba katalogdan seçilmiş olmalı. Seçilmemişse “Kalıp seç” tuşu sizi doğrudan seçiciye götürür. Sürükleyerek döndürün, iki parmakla yakınlaştırın.',
        screens: [
          {
            shot: 'g07_4d',
            title: '4D simülasyon',
            items: [
              'Adım rozeti: düz sac, kaçıncı büküm ve hangi kanat; parçanın çevrileceği anı da yazar.',
              'Çarpışma özeti: çarpışma var mı, kontrol edilemeyen bölge hangisi. Dokununca Açıklama açılır.',
              'Adım adım (operatör kartı), Dayama (arka dayama kalibrasyonu), Zımbayı ters çevir, Bitir (parçanın son hali).',
              'Kaydırma çubuğu: bükümler arasında ileri geri gidin.',
              'Önceki büküm, oynat / duraklat, sonraki büküm, baştan, hız (½× 1× 2×), dönme merkezi.',
            ],
          },
          {
            shot: 'g08_check',
            title: 'Kontrol açıklaması',
            items: [
              'Kullanılan takım, varsa çarpışmalar ve kontrol edilemeyen bölgeler. Sarı satırlar hangi makine ya da takım ölçüsünün eksik olduğunu ve nereye girileceğini söyler.',
              'Kapat.',
            ],
          },
        ],
      },
      {
        id: 'pas-a-pas',
        tab: 'Adım adım büküm',
        intro: '4D’de “Adım adım”a dokunun. Sarı kutu, parçayı ters çevirmeniz ya da 180° döndürmeniz gereken anı söyler. “Önceki” / “Sonraki” ile ilerleyin. Son bükümde “Parça bitti” ve “Kalibre et” çıkar: ölçtüğünüz kanatlarla arka dayama ofsetini kaydedersiniz. Ofset yalnız dayama ölçüsüne eklenir; FL, BD, PDF ve DXF değişmez.',
        screens: [
          {
            shot: 'g09_fold',
            title: 'Operatör kartı',
            items: [
              'Büküm 2/4 · B: sıradaki büküm ve kanat. “Yan görünüş” / “Serbest görünüş” kamerayı değiştirir.',
              'Açı.',
              'Yön: 1. bükümle aynı ya da ters.',
              'Arka dayama · B kanadı: dayamaya yaslanan kanat ve ölçü, kalıp merkezinden (V ortası).',
            ],
          },
        ],
      },
      {
        id: 'sorties',
        tab: 'PDF ve paylaşım',
        intro: 'DXF ve 1:1 ana ekranda, çizimin altındadır (2. bölüm); kesim dosyası için parçanın L ölçüsü gerekir. Firma adı ve logo Ayarlar’da da girilir.',
        screens: [
          {
            shot: 'g10_offer',
            title: 'Teklif önizleme',
            items: ['Firma logonuz ve adınız, ölçülü çizim. “PDF Oluştur” dosyayı üretir, “Paylaş” gönderir.'],
          },
        ],
      },
    ],
    calib: {
      cta: 'Kalibrasyonu tam ekranda açın',
      ctaSub: '13 adım: önce atölyede ölçüm, sonra uygulamada kayıt',
      summary: [
        'Bir şerit kesin, boyunu ölçün (L).',
        'Tek büküm yapın.',
        'İki kanadı dış köşeden ölçün (a, b).',
        'L, a ve b’yi Test Bükümü Sihirbazı’na girin.',
        'Kaydedin: kurulum şeridinde “ölçülmüş” yazar.',
      ],
      preview: 'k04_result',
      title: 'Kalibrasyon — adım adım',
      close: 'Kapat',
      prev: 'Geri',
      next: 'İleri',
      finish: 'Bitir',
      step: 'Adım {i} / {n}',
      shop: 'Atölyede',
      app: 'Uygulamada',
      labels: { cut: 'kesilen boy', outer: 'dış köşe', line: 'büküm çizgisi', example: 'Örnek' },
      steps: [
        {
          tag: 'shop',
          shot: 'g05_settings',
          title: 'Kurulumu eşleyin',
          text: 'Deneme parçasını üreteceğiniz parçayla aynı malzemeden (mümkünse aynı partiden), aynı kalınlıkta yapın. Abkanta o parçada kullanacağınız alt kalıbı (V) ve zımbayı bağlayın. Ayarlar’da aynı malzeme, kalınlık ve alt kalıp seçili olsun; açı, ekrandaki büküm açısıdır. Kayıt bu dördüne bağlanır.',
          items: ['Dil: hesabı etkilemez.', 'Malzeme: deneme şeridinin malzemesi.', 'Kalınlık: deneme şeridinin kalınlığı.', 'Makine: büküm payını etkilemez.', 'Alt kalıp: abkanttaki V ile aynı.'],
        },
        {
          tag: 'shop',
          diagram: 'strip',
          title: 'Şeridi kesin, L’yi ölçün',
          text: 'Düz, çapaksız bir şerit kesin. Boyunu kesimden sonra kumpas ya da çelik cetvelle ölçün: bu L’dir (örnek 100 mm). Kesim listesindeki değeri değil, ölçtüğünüz değeri yazın; L’deki hata büküm payına aynen geçer. İki kanat da kalıba oturacak ve kumpasla rahat ölçülecek uzunlukta olsun.',
          items: [],
        },
        {
          tag: 'shop',
          diagram: 'bend',
          title: 'Tek büküm yapın',
          text: 'Şeridi ortaya yakın bir yerden, uygulamada seçili açıyla (ör. 90°) bir kez bükün. Açıyı açıölçerle kontrol edin: açı tutmuyorsa önce açıyı düzeltin, ölçümü doğru açıdaki parçadan alın.',
          items: [],
        },
        {
          tag: 'shop',
          diagram: 'measure',
          title: 'Kanatları dış köşeden ölçün: a ve b',
          text: 'Kumpası bir kanadın ucundan öteki kanadın DIŞ yüzeyine kadar dayayın: bu a’dır. Aynısını öteki kanat için yapın: b. İç yüzeyden ya da radüsün başladığı yerden ölçmeyin. Ondalığı yazın (ör. 51,7 ve 51,8).',
          items: [],
        },
        {
          tag: 'shop',
          diagram: 'formula',
          title: 'Kontrol: a + b, L’den büyük',
          text: 'Büküm payı BD = a + b − L. Örnek: 51,7 + 51,8 − 100 = 3,50 mm. a + b, L’den küçük çıkıyorsa kanatlar içten ölçülmüştür; ölçümü tekrarlayın. Hesabı uygulama yapar; bu adım yalnız kontrol içindir.',
          items: [],
        },
        {
          tag: 'app',
          shot: 'k01_bdcard',
          title: 'BD kartını bulun',
          text: 'Kurulum şeridine dokunun, Ayarlar’da aşağı kaydırın.',
          items: ['BD otomatik: şu anki kurulumun büküm payı ve hangi kuruluma ait olduğu.', '“Manuel BD” anahtarı.'],
        },
        {
          tag: 'app',
          shot: 'k02_manual',
          title: '“Manuel BD”yi açın',
          text: 'Değeri elle yazabileceğiniz bir alan çıkar. Altındaki sihirbaz bu değeri sizin yerinize hesaplar.',
          items: ['“Manuel BD” açık.', '“Test Bükümü Sihirbazı”na dokunun.'],
        },
        {
          tag: 'app',
          shot: 'k03_wizard',
          title: 'Ölçüleri girin',
          text: 'Atölyede ölçtüğünüz üç değeri yazın.',
          items: [
            'Kesilen boy L (mm): şeridin ölçülen boyu.',
            'Kanat a (mm).',
            'Kanat b (mm): iki kanat da dış köşeden ölçülmüş.',
          ],
        },
        {
          tag: 'app',
          shot: 'k04_result',
          title: 'Sonucu kontrol edin',
          text: 'Ölçülerden geçerli bir değer çıkmazsa uygulama kanatları dış köşeden ölçmenizi hatırlatır.',
          items: [
            'Girdiğiniz değerler.',
            'Ölçülen büküm payı: a + b − L (burada 3,50 mm / büküm).',
            '“Kullan ve kaydet”: değeri Manuel BD alanına yazar ve kaydetmeyi sorar.',
          ],
        },
        {
          tag: 'app',
          shot: 'k05_ask',
          title: 'Kaydı onaylayın',
          text: 'Değer formülden çok saparsa (ör. virgül hatası) kalın bir uyarı çıkar: kaydetmeden önce ölçümü kontrol edin.',
          items: [
            'Soru, değerin hangi kurulum için kaydedileceğini yazar: malzeme, kalınlık, açı ve V.',
            '“Evet, kaydet”: bu kurulumun kalıcı referansı olur.',
            '“Hayır”: kaydedilmez; değer Manuel BD açık kaldıkça kullanılır.',
          ],
        },
        {
          tag: 'app',
          shot: 'k06_measured',
          title: '“Manuel BD”yi kapatın',
          text: 'Bu kurulumla girdiğiniz her parça artık sizin büküm payınızla hesaplanır; FL de buna göre değişir.',
          items: ['BD otomatik artık sizin değerinizi gösterir (3,50).', '“ölçülmüş” rozeti: değer formülden değil, sizin ölçümünüzden gelir.'],
        },
        {
          tag: 'app',
          shot: 'k08_strip',
          title: 'Ana ekranda kontrol edin',
          text: '“ölçülmüş” görünmüyorsa bu kurulum için kayıt yoktur: malzeme, kalınlık, kalıp ya da açı farklıdır.',
          items: ['Kurulum şeridi: “BD 3.50 mm / büküm ölçülmüş”. Hesap sizin ölçümünüzle yapılıyor.'],
        },
        {
          tag: 'app',
          shot: 'k07_list',
          title: 'Kayıtlı ölçümleri yönetin',
          text: 'Ayarlar › Kayıtlı Ölçümler. Düzenleme yoktur: aynı kuruluma yeni ölçü kaydedilince eskisinin yerine geçer.',
          items: [
            'Her satır: büküm payı — malzeme • kalınlık • açı • V.',
            'Sil: satırı kaldırır (onay sorar, geri alınamaz).',
            'Dışa Aktar: bütün ölçümler tek dosyada (.bqcal); yedek için ya da başka telefona taşımak için.',
            'İçe Aktar: dosyadaki ölçümleri ekler; mevcutları korursunuz ya da üzerine yazarsınız.',
          ],
        },
      ],
      tips: {
        title: 'Bilmeniz gerekenler',
        items: [
          'Her kurulum ayrı kayıttır: aynı sacı başka kalıpla ya da başka açıyla bükecekseniz o kurulum için de deneme bükümü ölçün. “Kapsama” ekranı hangi açıların ölçüldüğünü gösterir.',
          'Malzeme partisi, hadde yönü ve takım aşınması sonucu etkiler: parti değişince yeniden ölçün.',
          'Genel profilde açılar farklıysa tek ölçüm hepsine uygulanamaz; uygulama bu durumda kaydetmez.',
          'Kritik parçada seri üretimden önce deneme bükümü yine kuraldır.',
        ],
        more: 'Yöntemin ayrıntısı: büküm payını tek deneme bükümüyle ölçmek',
      },
    },
    end: {
      text: 'Öğrenmenin en kolay yolu: bu adımları bir sonraki parçanızda tekrarlamak.',
      cta: "Google Play'de 7 gün deneyin",
    },
  },
}
