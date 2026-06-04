export type TimelineDetail = {
  text: string;
};

export type TimelineInfoSession = {
  title: string;
  date: string;
  time: string;
  youtube: { href: string; label: string };
};

export type TimelineNoticeSessions = {
  intro: string;
  sessions: TimelineInfoSession[];
};

export type TimelineNotice = {
  /** Adım 1–2 birlikte yürütme ve ikinci başvuru akışı */
  processNote?: string;
  registration?: string;
  sessionsBlock?: TimelineNoticeSessions;
};

export const poolEducationCopy = {
  title: '42 Türkiye Havuz Eğitimi Nedir?',
  description:
    "Havuz Eğitimi, 42 Türkiye'nin seçim sürecidir. Yaklaşık 26 gün süren bu yoğun deneyimde adaylar, eğitmensiz ve akran öğrenimine dayalı eğitim modelini deneyimler. Gerçek projeler üzerinde çalışır, problem çözme becerilerini geliştirir ve 42'nin öğrenme kültürünü yakından tanır. Süreci başarıyla tamamlayan adaylar Ana Eğitim'e geçiş yaparak 42 Türkiye öğrencisi olmaya hak kazanır.",
  portal: {
    href: 'https://42istanbul.com.tr',
    label: "42 Türkiye'yi detaylı incele!",
  },
} as const;

export type TimelineStep = {
  id: string;
  stepLabel: string;
  title: string;
  date?: string;
  dateLabel?: string;
  description?: string;
  details?: TimelineDetail[];
  detailsLabel?: string;
  portal?: { href: string; label: string };
  /** Kısa uyarı — açıklama kutusunda gösterilir */
  callout?: string;
  notice?: string | TimelineNotice;
  variant?: 'default' | 'milestone' | 'celebrate' | 'finale';
};

export const timelineSteps: TimelineStep[] = [
  {
    id: 'apply',
    stepLabel: 'Adım 1',
    title: '42 Türkiye Havuz Eğitimine Başvur',
    dateLabel: 'Son Tarihler',
    date: '13 Haziran 2026',
    description:
      'Fintech Fellow yolculuğu 42 Türkiye havuz eğitimiyle başlar. İlk adım olarak 42 Türkiye başvuru portalında hesap oluşturma, online testler ve tanışma toplantısı adımlarını tamamalısın. Aşağıdaki link üzerinden başvurunun ilk adımını tamamlayabilirsin!',
    portal: {
      href: 'https://apply.42istanbul.com.tr',
      label: '42 Türkiye Başvuru Portalı',
    },
    detailsLabel: 'Aşağıdaki adımları tamamladığından emin olmalısın.',
    details: [
      { text: '42 Türkiye (42 İstanbul) hesabı oluşturma + e-posta doğrulama' },
      {
        text: '42 Türkiye Online test aşaması (Bu aşamanın sonuçlanması 1 gün sürebilir.)',
      },
      {
        text: '42 Türkiye Tanışma Toplantısı (Unutma: hesabında belirtilen 15 Haziran tarihli tanışma toplantısına kayıt olduğuna emin olmalısın. Tanışma toplantısı 15 Haziran 2026, 15.00\'da 42 İstanbul kampüsünde yüz yüze gerçekleşecektir.)',
      },
    ],
  },
  {
    id: 'fellow-apply',
    stepLabel: 'Adım 2',
    title: 'Fintech Fellow Başvuru Formunu Doldur',
    dateLabel: 'Son Tarih',
    date: '13 Haziran 2026',
    description:
      'Programa resmi başvurunun ilk adımını bu form ile tamamlamış olacaksın. Sürece devam edebilmek için ise 42 Türkiye havuz eğitimini başarıyla tamamlaman gerekiyor. Merak etme, senin için çok eğlenceli ve öğretici bir süreç olacak!',
    portal: {
      href: 'https://docs.google.com/forms/d/161PvaADc9FOpnKvM8_9ZPE09O3mJ8LT2R6os1IfoWWA/',
      label: 'Fintech Fellow Başvuru Formu',
    },
    notice: {
      processNote:
        'Adım 1 ve Adım 2\'yi birlikte yürütmen gerekiyor: önce 42 Türkiye havuz başvurunu (Adım 1) ve Fintech Fellow başvuru formunu (Adım 2) tamamla.',
      registration:
        "17–18 Haziran 2026 tarihlerinden birinde 42 İstanbul Kampüsü'ne giderek kayıt işlemini tamamlamalısın!",
      sessionsBlock: {
        intro:
          'Sürece dair daha detaylı bilgi almak istersen aşağıdaki tanıtım oturumlarına katılabilirsin. Canlı yayınlar kayıt altına alınıyor; aynı link üzerinden tekrar izleyebilirsin.',
        sessions: [
          {
            title: '1. Oturum',
            date: '6 Haziran 2026',
            time: '15.00',
            youtube: {
              href: 'https://www.youtube.com/watch?v=UMcwh_V960A',
              label: 'Canlı yayın',
            },
          },
          {
            title: '2. Oturum',
            date: '7 Haziran 2026',
            time: '19.00',
            youtube: {
              href: 'https://www.youtube.com/watch?v=7t0fEnEVKtk',
              label: 'Canlı yayın',
            },
          },
        ],
      },
    },
  },
  {
    id: 'pool',
    stepLabel: 'Adım 3',
    title: poolEducationCopy.title,
    dateLabel: 'Dönem',
    date: '22 Haziran 2026 – 17 Temmuz 2026',
    description: poolEducationCopy.description,
    portal: poolEducationCopy.portal,
  },
  {
    id: 'main-edu',
    stepLabel: 'Adım 4',
    title: 'Kickoff İle Ana Eğitime Başla',
    dateLabel: 'Başlangıç',
    date: '3 Ağustos 2026',
    description:
      'Havuz eğitimini başarıyla tamamladıktan sonra Kickoff ile 42 Türkiye ana müfredatına geçersin. Proje bazlı eğitim dönemi burada başlar.',
  },
  {
    id: 'assessment',
    stepLabel: 'Adım 5',
    title: '2 Aşamalı Değerlendirmeden Geç',
    dateLabel: 'Dönem',
    date: 'Kasım ayının ilk iki haftası',
    description: 'Eğitimin 3. ayında uygulanır. Kişilik envanteri ve online mülakatı sırayla tamamlaman gerekir.',
    detailsLabel: 'Değerlendirme Aşamaları',
    variant: 'milestone',
    details: [
      { text: 'Kişilik Envanteri' },
      { text: 'Online Mülakat' },
    ],
  },
  {
    id: 'fellow',
    stepLabel: 'Adım 6',
    title: 'Fintech Fellow Ol',
    dateLabel: 'İlan Tarihi',
    date: '26 Kasım 2026',
    description: 'Değerlendirmeyi geçen adaylar Fellow olarak ilan edilir.',
    variant: 'celebrate',
  },
  {
    id: 'graduate',
    stepLabel: 'Adım 7',
    title: '42 Türkiye Eğitimini Tamamla Ve Mezun Ol',
    dateLabel: 'Mezuniyet',
    date: '3 Ağustos 2027',
    description: '42 Türkiye eğitim sürecini tamamladıktan sonra mezun oluyorsun.',
  },
  {
    id: 'career',
    stepLabel: 'Adım 8',
    title: 'Ödeal\'da Tam Zamanlı Çalışmaya Başla',
    description: 'Mezuniyet sonrası Ödeal\'da kariyerin başlıyor.',
    variant: 'finale',
  },
];

export const timelineTotal = timelineSteps.length;
