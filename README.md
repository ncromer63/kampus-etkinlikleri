https://kampus-etkinlikleri-seven.vercel.app/

# Kampüs Etkinlikleri — Sprint 5

Bu depo, Üniversite Kampüs Etkinlikleri web uygulamasının Sprint 1–5 geliştirme adımlarını içerir. Sprint 5 ile birlikte monolithic (tek büyük dosya) React yapısı; bağımsız, props ve callback'lerle haberleşen modüler bileşenlere (components) ayrıştırılmıştır.

## Yayın ve Çalıştırma Adresleri
- **Vercel Canlı Link:** https://kampus-etkinlikleri-seven.vercel.app/
- **Yerel Geliştirme (Local):** http://localhost:5173/ (`cd frontend` ardından `npm run dev`)
- **Vercel Yapılandırması:** Root Directory: `frontend`, Framework Preset: `Vite`

## Klasör Yapısı ve Dosyaların Görevleri

```text
frontend/src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx         # Başlık ve isteğe bağlı alt yazı çerçeve bileşeni (HeaderProps)
│   │   ├── Navigation.tsx     # Sayfa menüsü ve gezinme butonları (NavigationProps + callback)
│   │   └── Footer.tsx         # Öğrenci künyesini barındıran alt bilgi bileşeni
│   ├── events/
│   │   ├── EventCard.tsx      # Tek bir etkinlik kartının görselleştirilmesi (EventCardProps)
│   │   ├── EventList.tsx      # Etkinlik dizisini dönüp EventCard'ları listeleyen ortak bileşen
│   │   ├── EventFilter.tsx    # Arama kutusu ve kategori seçim formu (Lifting state + 2 callback)
│   │   └── EventDetail.tsx    # Tekil etkinliğin afiş, künye ve açıklama detay bloğu
│   └── forms/
│       └── EventForm.tsx      # Ekle ve Güncelle sayfalarında kullanılan ortak form bileşeni
├── data/
│   └── events.ts              # 6 adet tipli etkinlik mock verisi
├── types/
│   ├── campus-event.ts        # CampusEvent ve Category tipleri
│   └── page.ts                # PageName sayfa rotalandırma union tipi
├── utils/
│   ├── filter-events.ts       # Arama, kategori filtreleme ve ID ile bulma saf fonksiyonları
│   └── format-date.ts         # Türkçe tarih formatlama yardımcı fonksiyonu
├── App.css                    # Uygulamanın stilleri (Öğrenci No: 2416501085, ton: 5, Times New Roman)
├── App.tsx                    # Ana orkestrasyon bileşeni (State yönetimi, sayfa geçişleri)
├── index.css                  # Genel CSS sıfırlama dosyası
└── main.tsx                   # React uygulamasını başlatan kök dosya
```

## Sprint Özeti
1. **Sprint 1 (HTML, Git ve Yayına Alma):** Semantik HTML5 iskeleti, 5 sayfa, erişilebilir formlar (`sprint-01`).
2. **Sprint 2 (CSS ve Responsive Tasarım):** Numaraya göre CSS değişkenleri (`--ton: 5`, `--font: "Times New Roman"`), grid kart düzeni, responsive tasarım (`sprint-02`).
3. **Sprint 3 (JavaScript ve DOM):** Modüler ES yapısı, anlık arama + kategori filtreleme, URLSearchParams ile detay sayfası (`sprint-03`).
4. **Sprint 4 (Vite, TypeScript ve React):** `frontend/` içinde React-TS projesi, tipli veri, saf fonksiyonlar, tek bileşende 5 sayfa (`useState` + `useEffect`), `npm run build` ile hatasız üretim (`sprint-04`).
5. **Sprint 5 (React Bileşenleri & Modüler Mimari):** Tek büyük `App.tsx`'in 8 ayrı bileşene bölünmesi (`layout`, `events`, `forms`), `interface` ile tiplendirilmiş props & callback mimarisi, lifting state kuralı ve birebir korunan görsel tasarım (`sprint-05`).

## Öğrenci Bilgileri
- **Ad Soyad:** Ömer Nacar
- **Öğrenci No:** 2416501085
