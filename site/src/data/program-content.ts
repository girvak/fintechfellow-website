export type ProgramContentTone = 'blue' | 'green';

export type ProgramContentIcon = 'code' | 'fintech' | 'leaders' | 'fintalks' | 'growth';

export type ProgramContentBullet =
  | string
  | {
      text: string;
      link?: { href: string; label: string };
    };

export type ProgramContentCallout = {
  title: string;
  body: string;
};

export type ProgramContentItem = {
  id: string;
  tabLabel: string;
  /** Mobil sekme listesi — kısa etiket */
  tabLabelShort: string;
  tone: ProgramContentTone;
  heading: string;
  body?: string;
  bodySecondary?: string;
  bulletsLabel?: string;
  bullets?: ProgramContentBullet[];
  callout?: ProgramContentCallout;
  workshops?: ProgramContentCallout[];
  visual: {
    tone: ProgramContentTone;
    title: string;
    sub: string;
    icon: ProgramContentIcon;
  };
};

export const programContentItems: ProgramContentItem[] = [
  {
    id: 'code',
    tabLabel: "42 Türkiye'da Yazılım Eğitimi",
    tabLabelShort: '42 Yazılım Eğitimi',
    tone: 'blue',
    heading: 'Yazılımı Üreterek Öğren',
    body: "42 Türkiye'da öğrenme, gerçek projeler ve akran öğrenimi modeliyle ilerler. Algoritmalar, veri yapıları ve sistem programlama gibi alanlarda çalışırken teknik yetkinliklerini geliştirir, problem çözmeyi deneyimleyerek öğrenirsin. Eğitmen odaklı dersler yerine üreterek ilerler, akranlarından öğrenir ve kendi öğrenme yöntemini keşfedersin.",
    bullets: [
      'Sıfırdan ileri seviyeye C, Python, Shell ve ağ programlama',
      'Algoritma ve veri yapıları üzerine gerçek projeler',
      'Akran değerlendirmesiyle sürekli geri bildirim',
      'Kendi ritminde eğitim',
    ],
    visual: { tone: 'blue', title: '42 Türkiye', sub: 'Yazılım Eğitimi', icon: 'code' },
  },
  {
    id: 'fintech',
    tabLabel: 'Fintech Alanında Kariyer',
    tabLabelShort: 'Fintech Kariyer',
    tone: 'green',
    heading: "Fintech'i sektörün içinde keşfetmeye ne dersin?",
    body: "Fintech Fellow Programı'nda amacımız fintech'i sınıfta anlatmak değil; sektörün içindeki profesyonellerle bir araya getirerek gerçek iş dünyasını deneyimlemeni sağlamak.",
    bodySecondary:
      "Program boyunca düzenlenen ilham konuşmaları, panel ve networking etkinlikleriyle CTO'lar, CEO'lar, ürün yöneticileri ve alan uzmanlarıyla tanışma fırsatı bulabilirsin. Agile ve Scrum gibi çalışma modellerini atölyeler aracılığıyla deneyimleyerek Türkiye'nin önde gelen fintech etkinliklerinde sektör profesyonelleriyle buluşabilirsin.",
    bulletsLabel: 'Program kapsamında:',
    bullets: [
      'Fintech liderleriyle ilham ve kariyer buluşmaları',
      'CTO, CEO ve sektör uzmanlarıyla networking fırsatları',
      'Agile & Scrum çalışma modellerine yönelik atölyeler',
      'Uluslararası fintech etkinliklerine katılım',
      'Gerçek sektör deneyimlerine ve vaka paylaşımlarına erişim',
      'Fintech ekosisteminde güçlü bir profesyonel ağ oluşturma imkânı',
    ],
    visual: { tone: 'green', title: 'Fintech Alanında', sub: 'Kariyer', icon: 'fintech' },
  },
  {
    id: 'founders',
    tabLabel: "Founder's Table",
    tabLabelShort: "Founder's Table",
    tone: 'blue',
    heading: "Founder's Table",
    body: "Fintech ekosisteminin önde gelen kurucuları ve üst düzey yöneticileriyle gerçekleştirilen Founder's Table buluşmalarında sektörün karar vericileriyle doğrudan etkileşime geçebilirsin. Şirketlerin büyüme yolculuklarını, teknoloji vizyonlarını ve sektördeki güncel dönüşümleri liderlerin kendi deneyimlerinden dinleyerek güçlü bir profesyonel ağ kurma fırsatı yakalayabilirsin.",
    visual: { tone: 'blue', title: "Founder's Table", sub: '', icon: 'leaders' },
  },
  {
    id: 'mentorship',
    tabLabel: 'Birebir Mentörlük',
    tabLabelShort: 'Birebir Mentörlük',
    tone: 'green',
    heading: 'Birebir Mentörlük + Job Shadowing',
    body: "Eğitim sürecinde Ödeal ekibinden mentorlar ve sektör profesyonelleriyle birebir mentörlük görüşmelerine ve grup buluşmalarına katılarak hem Ödeal kültürünü yakından tanıyabilir hem de 42 Türkiye süreçlerine dair profesyonel rehberlik alabilirsin.",
    bullets: [
      'Ödeal ekibinden mentorlar ve sektör profesyonelleriyle birebir mentörlük görüşmelerine katılabilirsin',
      'Düzenli grup buluşmalarıyla gelişimini takip edebilir ve geri bildirim alabilirsin',
      "GİRVAK network'üne dahil olarak Slack üzerinden sürekli etkileşimde kalabilirsin",
      "14 günde bir yapılan check-in'lerle gelişim sürecin yakından takip edilir",
      'Programın son 2 ayında ayda 1 kez Ödeal ofisinde Job Shadowing deneyimi yaşayabilirsin',
      "Ödeal'da günlük iş akışını ve ekip dinamiklerini yerinde gözlemleyebilirsin",
    ],
    visual: { tone: 'green', title: 'Birebir', sub: 'Mentörlük', icon: 'fintalks' },
  },
  {
    id: 'growth',
    tabLabel: 'Kişisel ve Sosyal Gelişim',
    tabLabelShort: 'Kişisel Gelişim',
    tone: 'blue',
    heading: 'Kişisel ve Sosyal Gelişim',
    workshops: [
      {
        title: 'Strategy Design Workshop',
        body: 'Karmaşık problemleri analiz etme, uzun vadeli düşünme ve kaynakları verimli yönetme becerilerini geliştirebilirsin. Karar alma süreçlerinde sistematik ve yaratıcı tasarım yaklaşımlarını deneyimleyerek iş hayatında daha güçlü bir problem çözme ve stratejik düşünme perspektifi kazanabilirsin.',
      },
      {
        title: 'Self-Brand Accelerator',
        body: 'Kendi profesyonel kimliğini yeniden keşfedebilirsin. Hikâyeni nasıl anlatacağını, dijital varlığını nasıl yöneteceğini ve networking becerilerini geliştirerek iş hayatında kendini daha net konumlandırabilirsin; bu da kariyer görünürlüğünü ve fırsat erişimini artırır.',
      },
    ],
    visual: { tone: 'blue', title: 'Kişisel ve Sosyal', sub: 'Gelişim', icon: 'growth' },
  },
];
