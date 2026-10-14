https://kampus-etkinlikleri-seven.vercel.app/

# Kampüs Etkinlikleri — Frontend (Sprint 4)

Bu klasör, Vite + React + TypeScript mimarisiyle oluşturulmuş Kampüs Etkinlikleri web arayüzünü içerir.

## Canlı Yayın
- **Vercel Canlı Link:** https://kampus-etkinlikleri-seven.vercel.app/
- **Vercel Ayarı:** Root Directory: `frontend`, Framework Preset: `Vite`

## Dosyalar ve Görevleri
- `package.json` — Proje adı, komutlar (dev, build), paket listesi.
- `package-lock.json` — Yüklenen paketlerin tam sürümleri.
- `node_modules/` — İndirilen paketler; GitHub'a gitmez.
- `tsconfig*.json` — TypeScript ayarları.
- `vite.config.ts` — Vite ayarları, React eklentisi.
- `index.html` — Tek HTML; içinde boş div#root.
- `src/main.tsx` — React'i başlatır, App'i root'a çizer.
- `src/App.tsx` — Uygulamanın ana bileşeni (5 sayfa, state ile geçiş).
- `src/App.css` — App'in stilleri; Sprint 3 CSS'i buraya (öğrenci no: 2416501085).
- `src/index.css` — Tüm sayfaya genel stil; bu sprintte boş.
- `public/` — Olduğu gibi kopyalanan dosyalar (afiş ve favicon).
- `src/types/campus-event.ts` — Etkinlik ve kategori tipleri (`CampusEvent`, `Category`).
- `src/data/events.ts` — Tipli 6 adet etkinlik kaydı (`CampusEvent[]`).
- `src/utils/filter-events.ts` — Saf arama ve filtreleme fonksiyonları.

## Geliştirme ve Derleme
- Geliştirme sunucusu: `npm run dev`
- Üretim derlemesi: `npm run build`
- Önizleme: `npm run preview`

## Öğrenci Bilgileri
- **Ad Soyad:** Ömer Nacar
- **Öğrenci No:** 2416501085
