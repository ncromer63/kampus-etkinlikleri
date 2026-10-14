https://kampus-etkinlikleri-seven.vercel.app/

# Kampüs Etkinlikleri — Sprint 4

Bu depo, Üniversite Kampüs Etkinlikleri web uygulamasının Sprint 1–4 geliştirme adımlarını içerir. Sprint 4 ile birlikte uygulama Vite, TypeScript ve React mimarisine taşınmıştır.

## Canlı Yayın Adresi
- **Vercel Canlı Link:** https://kampus-etkinlikleri-seven.vercel.app/
- **Vercel Yapılandırması:** Root Directory: `frontend`, Framework Preset: `Vite`

## Adım 2 · Dosyaların Görevleri ve Açıklamaları
- `frontend/package.json` — Proje adı, komutlar (dev, build), paket listesi.
- `frontend/package-lock.json` — Yüklenen paketlerin tam sürümleri.
- `frontend/node_modules/` — İndirilen paketler; GitHub'a gitmez.
- `frontend/tsconfig*.json` — TypeScript ayarları.
- `frontend/vite.config.ts` — Vite ayarları, React eklentisi.
- `frontend/index.html` — Tek HTML; içinde boş div#root.
- `frontend/src/main.tsx` — React'i başlatır, App'i root'a çizer.
- `frontend/src/App.tsx` — Uygulamanın ana bileşeni (5 sayfa, state ile geçiş, filtreleme).
- `frontend/src/App.css` — App'in stilleri; Sprint 3 CSS'i buraya (öğrenci no: 2416501085).
- `frontend/src/index.css` — Tüm sayfaya genel stil; bu sprintte boş.
- `frontend/public/` — Olduğu gibi kopyalanan dosyalar (afiş ve favicon).

### Ek Sprint 4 Kaynak Dosyaları
- `frontend/src/types/campus-event.ts` — Etkinlik ve kategori tipleri (`CampusEvent`, `Category`).
- `frontend/src/data/events.ts` — Tipli 6 adet etkinlik kaydı (`CampusEvent[]`).
- `frontend/src/utils/filter-events.ts` — Arama, filtreleme ve bulma saf fonksiyonları (`searchEvents`, `filterByCategory`, `findEventById`).

## Sprint Özeti
1. **Sprint 1 (HTML, Git ve Yayına Alma):** Semantik HTML iskeleti, 5 sayfa, erişilebilir formlar (`sprint-01`).
2. **Sprint 2 (CSS ve Responsive Tasarım):** Numaraya göre CSS değişkenleri (`--ton: 5`, `--font: "Times New Roman"`), grid kart düzeni, responsive tasarım (`sprint-02`).
3. **Sprint 3 (JavaScript ve DOM):** Modüler ES yapısı, anlık arama + kategori filtreleme, URLSearchParams ile detay sayfası (`sprint-03`).
4. **Sprint 4 (Vite, TypeScript ve React):** `frontend/` içinde React-TS projesi, tipli veri, saf fonksiyonlar, tek bileşende 5 sayfa (`useState` + `useEffect`), `npm run build` ile hatasız üretim (`sprint-04`).

## Öğrenci Bilgileri
- **Ad Soyad:** Ömer Nacar
- **Öğrenci No:** 2416501085
