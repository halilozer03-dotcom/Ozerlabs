export const translations = {
  fr: {
    nav: { about: 'À propos', services: 'Services', projects: 'Projets', contact: 'Contact' },
    eyebrow: {
      brand: { label: 'Marque', value: 'Ozer Labs' },
      location: { label: 'Localisation', value: 'France' },
      discipline: { label: 'Discipline', value: 'Web · Mobile (iOS/Android) · IA' },
      status: { label: 'Statut', value: 'Nouveaux projets acceptés' },
    },
    hero: {
      titleLines: ['On ne fait pas', 'que concevoir,', 'on produit.'],
      sub: "Ozer Labs — de la conception web au développement d'applications Android/iOS, propulsé par l'IA : vos idées deviennent des produits fonctionnels.",
      ctaPrimary: 'Voir les projets',
      ctaSecondary: 'Nous contacter →',
    },
    about: {
      eyebrow: 'Qui',
      heading: 'Bonjour, je suis Ozer.',
      body1: "Je suis développeur et designer indépendant basé en France. Du site web à l'application mobile, je conçois, code et livre tout moi-même — sans couche d'agence, vous travaillez directement avec moi.",
      body2: 'Mon intérêt pour le pliage de tôle et la fabrication de précision influence aussi mon approche du logiciel : mesuré, testé, et conçu pour vraiment fonctionner.',
      stats: [
        { value: 'Web + Mobile', label: 'Une personne, deux plateformes' },
        { value: 'IA', label: 'Processus de production assisté' },
        { value: '1:1', label: 'Contact direct, sans intermédiaire' },
      ],
    },
    process: {
      steps: [
        { id: '01', title: 'Découverte', desc: 'On discute de vos besoins et objectifs, on définit le périmètre.' },
        { id: '02', title: 'Design', desc: 'Une interface et une expérience conçues pour votre marque.' },
        { id: '03', title: 'Développement', desc: 'Code web ou mobile, écrit et testé sur de vrais appareils.' },
        { id: '04', title: 'Livraison', desc: 'Mise en ligne, avec support et mises à jour si besoin.' },
      ],
    },
    pricing: {
      note: 'Les tarifs varient selon le projet — contactez-moi pour un devis précis.',
      tiers: [
        { name: 'Site Web', tag: 'WEB', features: ['Site vitrine ou multi-pages', 'Rapide, adapté au mobile', 'Design sur-mesure pour votre marque'], cta: 'Demander un devis' },
        { name: 'Application Mobile', tag: 'iOS · ANDROID', features: ['Base de code unique (React & Capacitor)', 'Publication Google Play / App Store', 'Maintenance et mises à jour incluses'], cta: 'Demander un devis' },
        { name: 'Système Assisté par IA', tag: 'SUR-MESURE', features: ["Automatisation et moteurs de calcul intelligents", 'Intégration adaptée à vos besoins', 'Accompagnement de bout en bout'], cta: 'En discuter' },
      ],
    },
    banner: { tagline: 'Nous construisons des solutions. Nous créons de la valeur.' },
    sectionLabels: { about: 'À propos', services: 'Services', process: 'Processus', projects: 'Projets', pricing: 'Tarifs', contact: 'Contact' },
    services: [
      { id: 'WD—01', title: 'Design Web', desc: "Des sites rapides et sobres, fidèles à votre identité de marque. Production de bout en bout, de la vitrine au système de commande." },
      { id: 'MB—02', title: 'Android / iOS', desc: "Applications mobiles à l'apparence native, développées avec React & Capacitor, publiées sur les deux plateformes à partir d'une seule base de code." },
      { id: 'AI—03', title: 'Solutions assistées par IA', desc: "Des produits renforcés par l'automatisation, des moteurs de calcul intelligents et des processus de production assistés par l'IA." },
    ],
    projects: [
      { tag: 'MOBILE · ANDROID', title: 'Özer Bend Pro', desc: 'Application de calcul du facteur K et de prévisualisation 3D pour les professionnels du pliage de tôle.', meta: ['REACT · CAPACITOR', '2026'] },
      { tag: 'SITE CLIENT · WEB', title: 'HD Auto', desc: 'Site vitrine pour un garage automobile, avec présentation des services et prise de rendez-vous.', meta: ['HTML · CSS · JS', '2026'], url: 'https://wwwhdauto.com' },
    ],
    contact: {
      heading: 'Un projet en tête ?',
      body: "Site web, application mobile ou système assisté par IA — je suis là pour transformer votre idée en produit.",
      details: [
        { label: 'E-mail', value: 'ozer.labs@gmail.com' },
        { label: 'Localisation', value: 'France' },
        { label: 'Réponse', value: '1-2 jours ouvrés' },
      ],
      form: { name: 'Nom', email: 'E-mail', message: 'Message', submit: 'Envoyer' },
      status: 'Votre application e-mail va s\'ouvrir — il ne reste qu\'à envoyer.',
    },
    footer: { copyright: '© 2026 OZER LABS — FRANCE', cta: 'PRÊT ? → NOUS CONTACTER' },
  },

  en: {
    nav: { about: 'About', services: 'Services', projects: 'Projects', contact: 'Contact' },
    eyebrow: {
      brand: { label: 'Brand', value: 'Ozer Labs' },
      location: { label: 'Location', value: 'France' },
      discipline: { label: 'Discipline', value: 'Web · Mobile (iOS/Android) · AI' },
      status: { label: 'Status', value: 'Accepting new projects' },
    },
    hero: {
      titleLines: ["We don't just", 'design,', 'we build.'],
      sub: 'Ozer Labs — from web design to Android/iOS app development, powered by AI: your ideas become working products.',
      ctaPrimary: 'See Projects',
      ctaSecondary: 'Get in Touch →',
    },
    about: {
      eyebrow: 'Who',
      heading: "Hi, I'm Ozer.",
      body1: "I'm a solo developer and designer based in France. From websites to mobile apps, I design, code, and ship everything myself — no agency layers, you work directly with me.",
      body2: 'My interest in sheet-metal fabrication and precision manufacturing shapes how I approach software too: measured, tested, and built to actually work.',
      stats: [
        { value: 'Web + Mobile', label: 'One person, two platforms' },
        { value: 'AI', label: 'Assisted production process' },
        { value: '1:1', label: 'Direct contact, no middlemen' },
      ],
    },
    process: {
      steps: [
        { id: '01', title: 'Discovery', desc: 'We talk through your needs and goals and define the scope.' },
        { id: '02', title: 'Design', desc: 'An interface and experience tailored to your brand.' },
        { id: '03', title: 'Build', desc: 'Web or mobile code, written and tested on real devices.' },
        { id: '04', title: 'Ship', desc: 'Launched live, with support and updates as needed.' },
      ],
    },
    pricing: {
      note: 'Pricing varies by project — get in touch for an accurate quote.',
      tiers: [
        { name: 'Website', tag: 'WEB', features: ['Landing page or multi-page site', 'Fast, mobile-friendly', 'Design tailored to your brand'], cta: 'Get a Quote' },
        { name: 'Mobile App', tag: 'iOS · ANDROID', features: ['Single codebase (React & Capacitor)', 'Google Play / App Store publishing', 'Maintenance and updates included'], cta: 'Get a Quote' },
        { name: 'AI-Powered System', tag: 'CUSTOM', features: ['Automation and smart calculation engines', 'Integration tailored to your needs', 'End-to-end guidance'], cta: "Let's Talk" },
      ],
    },
    banner: { tagline: 'Building solutions. Creating value.' },
    sectionLabels: { about: 'About', services: 'Services', process: 'Process', projects: 'Projects', pricing: 'Pricing', contact: 'Contact' },
    services: [
      { id: 'WD—01', title: 'Web Design', desc: 'Fast, clean websites true to your brand identity. End-to-end production, from a landing page to a full ordering system.' },
      { id: 'MB—02', title: 'Android / iOS', desc: 'Native-feeling mobile apps built with React & Capacitor, published on both platforms from a single codebase.' },
      { id: 'AI—03', title: 'AI-Powered Solutions', desc: 'Products strengthened by automation, smart calculation engines, and AI-assisted production workflows.' },
    ],
    projects: [
      { tag: 'MOBILE · ANDROID', title: 'Özer Bend Pro', desc: 'K-factor calculation and 3D preview app for sheet metal bending professionals.', meta: ['REACT · CAPACITOR', '2026'] },
      { tag: 'CLIENT SITE · WEB', title: 'HD Auto', desc: 'Showcase site for an auto garage, with service highlights and appointment booking.', meta: ['HTML · CSS · JS', '2026'], url: 'https://wwwhdauto.com' },
    ],
    contact: {
      heading: 'Got a project in mind?',
      body: "A website, a mobile app, or an AI-powered system — I'm here to turn your idea into a working product.",
      details: [
        { label: 'Email', value: 'ozer.labs@gmail.com' },
        { label: 'Location', value: 'France' },
        { label: 'Response', value: '1-2 business days' },
      ],
      form: { name: 'Name', email: 'Email', message: 'Message', submit: 'Send' },
      status: 'Your mail app will open — just hit send.',
    },
    footer: { copyright: '© 2026 OZER LABS — FRANCE', cta: 'READY? → GET IN TOUCH' },
  },

  tr: {
    nav: { about: 'Hakkımda', services: 'Hizmetler', projects: 'Projeler', contact: 'İletişim' },
    eyebrow: {
      brand: { label: 'Marka', value: 'Ozer Labs' },
      location: { label: 'Konum', value: 'Fransa' },
      discipline: { label: 'Disiplin', value: 'Web · Mobil (iOS/Android) · AI' },
      status: { label: 'Durum', value: 'Yeni proje kabul ediyor' },
    },
    hero: {
      titleLines: ['Sadece', 'tasarlamıyoruz,', 'üretiyoruz.'],
      sub: 'Ozer Labs — web tasarımdan Android/iOS uygulama geliştirmeye, yapay zeka destekli çözümlerle fikirlerin çalışan ürüne dönüştüğü yer.',
      ctaPrimary: 'Projeleri Gör',
      ctaSecondary: 'İletişime Geç →',
    },
    about: {
      eyebrow: 'Kim',
      heading: 'Merhaba, ben Ozer.',
      body1: 'Fransa\'da yaşayan, solo bir yazılımcı ve tasarımcıyım. Web sitesinden mobil uygulamaya, tasarımdan koda kadar her şeyi kendim yapar, kendim teslim ederim — aradan ajans katmanı çıkar, doğrudan benimle çalışırsın.',
      body2: 'Sac büküm ve hassas imalata duyduğum ilgi, yazılıma da aynı disiplinle yaklaşmamı sağlıyor: ölçülü, test edilmiş, gerçekten çalışan ürün.',
      stats: [
        { value: 'Web + Mobil', label: 'Tek kişi, iki platform' },
        { value: 'AI', label: 'Destekli üretim süreci' },
        { value: '1:1', label: 'Doğrudan iletişim, aracısız' },
      ],
    },
    process: {
      steps: [
        { id: '01', title: 'Keşif', desc: 'İhtiyacını ve hedeflerini konuşuruz, kapsamı netleştiririz.' },
        { id: '02', title: 'Tasarım', desc: 'Markana özel arayüz ve kullanıcı deneyimi tasarlanır.' },
        { id: '03', title: 'Geliştirme', desc: 'Web veya mobil kod yazılır, gerçek cihazlarda test edilir.' },
        { id: '04', title: 'Teslim', desc: 'Canlıya alınır; ihtiyaç halinde destek ve güncelleme sağlanır.' },
      ],
    },
    pricing: {
      note: 'Fiyatlar projeye göre değişir — doğru teklif için iletişime geç.',
      tiers: [
        { name: 'Web Sitesi', tag: 'WEB', features: ['Tek sayfa veya çok sayfalı site', 'Hızlı, mobil uyumlu', 'Markana özel tasarım'], cta: 'Teklif Al' },
        { name: 'Mobil Uygulama', tag: 'iOS · ANDROID', features: ['React & Capacitor ile tek kod tabanı', 'Google Play / App Store yayını', 'Bakım ve güncelleme dahil'], cta: 'Teklif Al' },
        { name: 'AI Destekli Sistem', tag: 'ÖZEL', features: ['Otomasyon ve akıllı hesaplama motorları', 'İhtiyaca özel entegrasyon', 'Uçtan uca danışmanlık'], cta: 'Görüşelim' },
      ],
    },
    banner: { tagline: 'Çözümler inşa ediyoruz. Değer yaratıyoruz.' },
    sectionLabels: { about: 'Hakkımda', services: 'Hizmetler', process: 'Süreç', projects: 'Projeler', pricing: 'Fiyatlandırma', contact: 'İletişim' },
    services: [
      { id: 'WD—01', title: 'Web Tasarım', desc: 'Marka kimliğine uygun, hızlı ve sade web siteleri. Kurumsal sayfadan sipariş sistemine kadar uçtan uca üretim.' },
      { id: 'MB—02', title: 'Android / iOS', desc: 'React & Capacitor tabanlı, tek koddan iki platforma yayınlanan native hisli mobil uygulamalar.' },
      { id: 'AI—03', title: 'AI Destekli Çözümler', desc: 'Otomasyon, akıllı hesaplama motorları ve yapay zeka destekli üretim süreçleriyle güçlendirilmiş ürünler.' },
    ],
    projects: [
      { tag: 'MOBILE · ANDROID', title: 'Özer Bend Pro', desc: 'Sac büküm profesyonelleri için K-faktör hesaplama ve 3D önizleme uygulaması.', meta: ['REACT · CAPACITOR', '2026'] },
      { tag: 'MÜŞTERİ · WEB', title: 'HD Auto', desc: 'Oto tamir ve bakım servisi için hizmet tanıtımı ve randevu alma özellikli tanıtım sitesi.', meta: ['HTML · CSS · JS', '2026'], url: 'https://wwwhdauto.com' },
    ],
    contact: {
      heading: 'Bir proje mi var aklında?',
      body: 'Web sitesi, mobil uygulama ya da AI destekli bir sistem — fikrini üretime dönüştürmek için buradayım.',
      details: [
        { label: 'E-posta', value: 'ozer.labs@gmail.com' },
        { label: 'Konum', value: 'Fransa' },
        { label: 'Yanıt', value: '1-2 iş günü' },
      ],
      form: { name: 'İsim', email: 'E-posta', message: 'Mesaj', submit: 'Gönder' },
      status: 'Mail uygulaman açılacak — sadece gönder\'e basman yeterli.',
    },
    footer: { copyright: '© 2026 OZER LABS — FRANCE', cta: 'HAZIR MISIN? → İLETİŞİME GEÇ' },
  },
}

export const languages = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'tr', label: 'TR' },
]
