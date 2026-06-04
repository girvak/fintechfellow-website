export type FaqItem = {
  q: string;
  a: string;
  cta?: { href: string; label: string };
};

export type FaqGroup = {
  id: string;
  label: string;
  items: FaqItem[];
};

export const homepageFaqGroups: FaqGroup[] = [
  {
    id: 'basvuru',
    label: 'Başvuru Süreci',
    items: [
      {
        q: 'Başvurmak için ne gerekiyor?',
        a: "18–27 yaş aralığında olmak ve İstanbul'da ikamet etmek. Diploma veya geçmiş yazılım deneyimi şart değil. Aradığımız tek şey yazılıma gerçek merak ve 9 ay boyunca tam zamanlı katılım taahhüdü.",
      },
      {
        q: 'Başvuru süreci nasıl işliyor?',
        a: "Fintech Fellow Programı'na katılabilmek için öncelikle 42 İstanbul kampüsünde Ana Eğitim'e başlamaya hak kazanman gerekir. Bunun için 42 Türkiye başvuru sürecini tamamlayarak Havuz Eğitimi'nde başarılı olmalı ve Ana Eğitim'e kabul edilmelisin. Başvuru süreci apply.42istanbul.com.tr üzerinden hesap oluşturmanla başlar. Ardından online testleri tamamlar ve tanışma toplantısına katılırsın. Sonrasında 42 İstanbul Havuz Eğitimi'ne katılarak 42'nin eğitim modelini deneyimlersin.\n\nHavuz Eğitimi'ni başarıyla tamamlayarak Ana Eğitime başlayan öğrenciler Fintech Fellow Programı'na başvurabilir. Programın değerlendirme sürecinde kişilik envanteri ve online mülakat uygulanır. Nihai sonuçlar Kasım 2026'da açıklanacaktır.",
        cta: { href: '/basvur', label: 'Adım Adım Takvimi Gör' },
      },
      {
        q: 'Daha önce hiç kod yazmadım, başvurabilir miyim?',
        a: 'Evet. Temel programlama bilgisi faydalı olur ama zorunlu değil. Önemli olan öğrenmeye açıklık, soru sormaktan çekinmemek ve sürece sadık kalmak.',
      },
      {
        q: 'Üniversite öğrencisi başvurabilir mi?',
        a: 'Evet, ancak program tam zamanlı katılım gerektiriyor. Uzaktan veya esnek öğretim programındaysan durumunu başvuru formundaki motivasyon bölümünde anlat; bireysel değerlendiriyoruz.',
      },
    ],
  },
  {
    id: 'program',
    label: 'Program Ve Kariyer',
    items: [
      {
        q: 'Program tamamen ücretsiz mi?',
        a: 'Evet, program ücretsiz. Ayrıca program süresince aylık 20.000 TL burs alıyorsun — 9 ay boyunca toplam 180.000 TL.',
      },
      {
        q: 'Burs ne zaman başlar?',
        a: 'Program başladığında burs da başlar ve her ay düzenli olarak ödenir. 9 ay boyunca aylık 20.000 TL alırsın.',
      },
      {
        q: '42 Türkiye Havuz Eğitimi Nedir?',
        a: "Havuz Eğitimi, 42 Türkiye'nin seçim sürecidir.\n\nYaklaşık 26 gün süren bu yoğun deneyimde adaylar, eğitmensiz ve akran öğrenimine dayalı eğitim modelini deneyimler. Gerçek projeler üzerinde çalışır, problem çözme becerilerini geliştirir ve 42'nin öğrenme kültürünü yakından tanır. Süreci başarıyla tamamlayan adaylar Ana Eğitim'e geçiş yaparak 42 Türkiye öğrencisi olmaya hak kazanır.",
        cta: { href: 'https://42istanbul.com.tr', label: "42 Türkiye'yi detaylı incele!" },
      },
      {
        q: 'Program online mı, yüz yüze mi?',
        a: "42 Türkiye'nin eğitim modeli yüz yüze kampüs deneyimine dayanır. Fintech Fellow Programı kapsamında yer alan Havuz Eğitimi ve Ana Eğitim süreçleri 42 İstanbul kampüsünde yüz yüze olarak gerçekleştirilir.\n\nArdından dahil olacağınız Fintech Fellow programı kapsamındaki bazı mentorlük görüşmeleri, etkinlikler ve buluşmalar ise hibrit veya online olarak düzenlenebilir.",
      },
      {
        q: 'Programda mentorlük ve sektör buluşmaları var mı?',
        a: 'Evet. CEO ve lider buluşmaları, FinTalks oturumları ve birebir mentörlük programın parçası. Amaç yalnızca kod yazmak değil; sektörü yakından tanıyarak kariyere hazırlanman.',
      },
      {
        q: 'İş garantisi nasıl çalışıyor?',
        a: "Programı başarıyla tamamlayan her Fellow, Ödeal'da tam zamanlı yazılım geliştirici olarak işe başlıyor. Bu programın kuruluş amacı zaten Fellow'ların istihdamı.",
      },
    ],
  },
];

/** Düz liste — iki sütun bölümü veya dış kullanım için */
export const homepageFaq: FaqItem[] = homepageFaqGroups.flatMap((g) => g.items);
