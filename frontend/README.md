https://kampus-etkinlikleri-seven.vercel.app/

# Kampüs Etkinlikleri — Frontend (Sprint 5)

Bu klasör, Vite + React + TypeScript mimarisiyle oluşturulmuş ve Sprint 5 kapsamında modüler bileşenlere (components) ayrıştırılmış Kampüs Etkinlikleri web arayüzünü içerir.

## Canlı Yayın
- **Vercel Canlı Link:** https://kampus-etkinlikleri-seven.vercel.app/
- **Vercel Ayarı:** Root Directory: `frontend`, Framework Preset: `Vite`

## Dosyalar ve Görevleri
- `package.json` — Proje adı, komutlar (dev, build, lint), paket listesi.
- `package-lock.json` — Yüklenen paketlerin tam sürümleri.
- `node_modules/` — İndirilen paketler; GitHub'a gitmez.
- `tsconfig*.json` — TypeScript ayarları.
- `vite.config.ts` — Vite ayarları, React eklentisi.
- `index.html` — Tek HTML; içinde boş `div#root`.
- `public/` — Doğrudan servis edilen statik dosyalar (afiş ve favicon).
- `src/main.tsx` — React'i başlatır, App'i root'a bağlar.
- `src/App.tsx` — Uygulamanın ana bileşeni (State yönetimi, sayfa geçişleri, üst seviye düzen).
- `src/App.css` — App stilleri (Öğrenci No: 2416501085, ton: 5, font: Times New Roman).
- `src/index.css` — Genel sayfa stili.

### Bileşenler (`src/components/`)
- `layout/Header.tsx` — Başlık ve alt yazı çerçeve bileşeni.
- `layout/Navigation.tsx` — Menü linkleri ve sayfa yönlendirme (callback).
- `layout/Footer.tsx` — Öğrenci künyesi.
- `events/EventCard.tsx` — Tek bir etkinlik kartı görünümü.
- `events/EventList.tsx` — Etkinlik dizisini dönüp EventCard listesini oluşturan ortak bileşen.
- `events/EventFilter.tsx` — Arama ve kategori filtre formu (Lifting state).
- `events/EventDetail.tsx` — Seçilen etkinliğin detay görünümü.
- `forms/EventForm.tsx` — Ekle ve Güncelle sayfaları ortak formu.

### Veri, Tipler ve Yardımcılar
- `src/types/campus-event.ts` — `CampusEvent` ve `Category` tipleri.
- `src/types/page.ts` — `PageName` rotalandırma tipi.
- `src/data/events.ts` — Tipli 6 adet etkinlik mock kaydı.
- `src/utils/filter-events.ts` — Saf arama ve filtreleme fonksiyonları.
- `src/utils/format-date.ts` — Türkçe tarih formatlama yardımcı fonksiyonu.

## Geliştirme ve Derleme
- Geliştirme sunucusu: `npm run dev`
- Üretim derlemesi: `npm run build`
- Kod kalitesi kontrolü: `npm run lint`
- Önizleme: `npm run preview`

## Öğrenci Bilgileri
- **Ad Soyad:** Ömer Nacar
- **Öğrenci No:** 2416501085
