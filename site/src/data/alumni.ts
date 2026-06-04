export type Alumni = {
  initials: string;
  firstName: string;
  lastName: string;
  name: string;
  position: string;
  company: string;
  /** Dönem kimliği — cohorts.id ile eşleşir */
  cohortId: string;
  cohort: string;
  quote: string;
  before: string;
  after: string;
  /** Gelinen geçmiş kartı — paths.id ile eşleşir */
  pathKey: 'civil' | 'mis' | 'comp-eng';
  bg: 'lm' | 'gd' | 'bd';
  /** /assets/alumni/... — yoksa baş harf avatarı */
  photo?: string;
  linkedin?: string;
  /** Ana sayfa mezun kartlarında göster (varsayılan: evet) */
  showOnHomepage?: boolean;
};

export type AlumniCohort = {
  id: string;
  label: string;
  badge: string;
  status: 'published' | 'recruiting';
  emptyTitle?: string;
  emptyText?: string;
};

export const alumniCohorts: AlumniCohort[] = [
  {
    id: '1',
    label: '1. Dönem',
    badge: 'Fellow 1.0',
    status: 'published',
  },
  {
    id: '2',
    label: '2. Dönem',
    badge: 'Fellow 2.0',
    status: 'recruiting',
    emptyTitle: 'Şu an başvurular alınıyor',
    emptyText: '',
  },
];

export const alumni: Alumni[] = [
  {
    initials: 'MİK',
    firstName: 'Mert İsmail',
    lastName: 'Köroğlu',
    name: 'Mert İsmail Köroğlu',
    position: 'Software Engineer',
    company: 'Ödeal',
    bg: 'lm',
    cohortId: '1',
    cohort: 'Fellow 1.0',
    quote:
      "Fintech Fellow Programı sayesinde yazılım kariyerine geçiş yaptım. Bugün Ödeal'da üretim ortamında çalışıyorum.",
    before: 'Yönetim Bilişim Sistemleri',
    after: 'Software Engineer',
    pathKey: 'mis',
    photo: '/assets/alumni/mert-ismail-koroglu.jpg',
    linkedin: 'https://www.linkedin.com/in/koroglumert',
    showOnHomepage: false,
  },
  {
    initials: 'MMY',
    firstName: 'Mustafa Melih',
    lastName: 'Yumak',
    name: 'Mustafa Melih Yumak',
    position: 'Software Engineer',
    company: 'Ödeal',
    bg: 'gd',
    cohortId: '1',
    cohort: 'Fellow 1.0',
    quote:
      "42 İstanbul'un proje tabanlı modeli ve Fellow programının sektör buluşmaları, Ödeal'da tam zamanlı bir kariyere giden yolu netleştirdi.",
    before: 'Yönetim Bilişim Sistemleri',
    after: 'Software Engineer',
    pathKey: 'mis',
    photo: '/assets/alumni/mustafa-melih-yumak.jpg',
    linkedin: 'https://www.linkedin.com/in/mustafa-melih-yumak-a3799a18a',
    showOnHomepage: false,
  },
  {
    initials: 'MK',
    firstName: 'Mustafa',
    lastName: 'Karakulak',
    name: 'Mustafa Karakulak',
    position: 'Software Engineer',
    company: 'Ödeal',
    bg: 'bd',
    cohortId: '1',
    cohort: 'Fellow 1.0',
    quote:
      "Liseden sonra 42 İstanbul'a girdim ve Yönetim Bilişim Sistemleri'ne kaydoldum. 42 İstanbul'un hiyerarşisiz ve esnek yapısı öz disiplinimi geliştirirken, yaşadığım deneyim yeni teknolojileri öğrenme hızımı artırdı. Fintech Fellow Programı ise bana güçlü bir network ve vizyon katarak dönüm noktam oldu. Bu yenilikçi süreçler sayesinde gelişen teknik ve iletişim becerilerim, bugün çalıştığım yerde takdir görüyor.",
    before: 'Yönetim Bilişim Sistemleri',
    after: 'Software Engineer',
    pathKey: 'mis',
    photo: '/assets/alumni/mustafa-karakulak.jpg',
    linkedin: 'https://www.linkedin.com/in/mustafakarakulak',
  },
  {
    initials: 'RB',
    firstName: 'Resul',
    lastName: 'Bozdemir',
    name: 'Resul Bozdemir',
    position: 'Software Engineer',
    company: 'Ödeal',
    bg: 'lm',
    cohortId: '1',
    cohort: 'Fellow 1.0',
    quote:
      'Yazılım öğrenmeye kendi başıma çalışırken 42 İstanbul ile tanıştım. Eğitim sürecimde dahil olduğum Fintech Fellow Programı ise kariyerimde önemli bir dönüm noktası oldu. Programın sağladığı burs, staj ve istihdam olanakları sayesinde eğitimime tam anlamıyla odaklanma fırsatı buldum. Eğitimimi tamamladıktan sonra ilk yazılım işime başlayarak profesyonel kariyerime adım attım. Kazandığım teknik bilgi, problem çözme yaklaşımı ve öğrenmeyi öğrenme bakış açısı, bugün de kendimi sürekli geliştirmeme katkı sağlıyor.',
    before: 'Yönetim Bilişim Sistemleri',
    after: 'Software Engineer',
    pathKey: 'mis',
    photo: '/assets/alumni/resul-bozdemir.jpg',
    linkedin: 'https://www.linkedin.com/in/resulb',
  },
  {
    initials: 'ŞP',
    firstName: 'Şerif',
    lastName: 'Palta',
    name: 'Şerif Palta',
    position: 'Software Engineer',
    company: 'Ödeal',
    bg: 'gd',
    cohortId: '1',
    cohort: 'Fellow 1.0',
    quote:
      'İnşaat mühendisliği mezunu olarak yazılım dünyasına geçişimde Fintech Fellow Programı gerçek bir dönüm noktası oldu. Hem teknik hem sosyal becerilerimi büyük ölçüde geliştirdi; öğrenmeyi öğrenme felsefesi sayesinde iş hayatında yeni teknolojilere kolayca adapte olabiliyorum.',
    before: 'İnşaat mühendisliği',
    after: 'Software Engineer',
    pathKey: 'civil',
    photo: '/assets/alumni/serif-palta.jpg',
    linkedin: 'https://www.linkedin.com/in/%C5%9Ferif-palta-1b9738209/',
  },
];

export function alumniByCohort(cohortId: string): Alumni[] {
  return alumni.filter((a) => a.cohortId === cohortId);
}

export const alumniForHomepage: Alumni[] = alumni.filter((a) => a.showOnHomepage !== false);

export function alumniCountByPath(pathKey: Alumni['pathKey']): number {
  return alumni.filter((a) => a.pathKey === pathKey).length;
}
