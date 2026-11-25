# Kampüs Etkinlikleri — Sprint 9 (Tam CRUD · PATCH, DELETE ve Sorgular)

https://kampus-etkinlikleri-seven.vercel.app/

Bu depo, Üniversite Kampüs Etkinlikleri web uygulamasının **Sprint 1–9** aşamalarını içerir.
- **`frontend/`:** React + Vite + TypeScript ile geliştirilen kullanıcı arayüzü (`localhost:5173` - Dokunulmadı).
- **`backend/`:** Node.js + Express + MongoDB & Mongoose ile tam CRUD ve gelişmiş sorgular sunan REST API sunucusu (`localhost:3000`).

---

## 🌐 Yayın ve Canlı Bağlantılar
- **Vercel Canlı Link (Frontend):** [https://kampus-etkinlikleri-seven.vercel.app/](https://kampus-etkinlikleri-seven.vercel.app/)
- **GitHub Deposu (Public):** [https://github.com/ncromer63/kampus-etkinlikleri](https://github.com/ncromer63/kampus-etkinlikleri)

---

## 🚀 Yerel Kurulum ve Çalıştırma

### Backend API Sunucusu (Port 3000)
```bash
# Backend dizinine geçin
cd backend

# Bağımlılıkları kurun
npm install

# .env dosyasını oluşturun (.env.example üzerinden)
cp .env.example .env

# Örnek veritabanı tohumlamasını (seed) çalıştırın (en az 2'si geçmiş tarihli 6 kayıt)
npm run seed

# Geliştirme modunda başlatın (watch modu aktiftir)
npm run dev

# Postman testlerini terminalden koşun (18 istek, 45 test)
newman run https://webdersi.vercel.app/test.json
```
Sunucu adresi: `http://localhost:3000`

---

## 📋 REST API Sözleşmesi

| Yöntem | Endpoint | Amaç / Açıklama | İstek Gövdesi / Query | Başarılı | Hata | Durum |
|:---:|---|---|---|:---:|:---:|:---:|
| **GET** | `/health` | Sağlık kontrolü ve öğrenci no (`2416501085`) | - | `200` | — | **Çalışıyor** |
| **GET** | `/events` | Etkinlik listesi (Arama ve kategori filtreli) | Query: `?search=atölye&category=Yazılım` | `200` | — | **Çalışıyor** |
| **GET** | `/events/upcoming` | Yaklaşan etkinlikler (Bugün ve sonrası, tarihe göre sıralı) | - | `200` | — | **Çalışıyor** |
| **GET** | `/events/:id` | MongoDB `_id` ile tek etkinlik detayı | - | `200` | `404` | **Çalışıyor** |
| **POST** | `/events` | Yeni etkinlik kaydı oluşturma | JSON (`title`\*, `date`\*, `location`\*, `category`\*, `capacity`, `description`) | `201` | `400` | **Çalışıyor** |
| **PATCH** | `/events/:id` | Etkinlik bilgilerini kısmi güncelleme | JSON (güncellenecek alanlar) | `200` | `400, 404` | **Çalışıyor** |
| **DELETE** | `/events/:id` | Etkinliği silme (Başarılı silmede gövde yok) | - | `204` | `404` | **Çalışıyor** |

### Önemli Kurallar:
- **Tarih Formatı:** Her yerde `"GG-AA-YYYY"` (örn: `"15-10-2026"`).
- **Hata Formatı:** `{ "error": { "message": "..." } }`
- **Geçersiz ID:** Her yerde `404 Not Found`.

---

## 📂 Depo Klasör Yapısı

```text
kampus-etkinlikleri/
├── frontend/                     # React + Vite Arayüzü (Dokunulmadı)
├── backend/                      # Node.js + Express + MongoDB & Mongoose REST API
│   ├── config/database.js        # Veritabanı bağlantı modülü
│   ├── data/seed-events.js       # 6 adet örnek veri seed betiği (2'si geçmiş tarihli)
│   ├── models/event.model.js     # Event Mongoose Modeli (Date set/get, toJSON getters)
│   ├── src/
│   │   ├── app.js               # Express app, CORS, JSON ve Hata Middleware'i
│   │   ├── server.js            # DB bağlantısı ve HTTP dinleme
│   │   ├── config/database.js   # DB bağlantı mantığı
│   │   ├── models/event.model.js # Event Schema
│   │   ├── data/seed-events.js  # Tohumlama scripti
│   │   ├── routes/event.routes.js # /events rotaları (/upcoming rotası /:id'den önce)
│   │   ├── controllers/event.controller.js # CRUD iş mantığı
│   │   └── utils/date.js        # parseDate, formatDate, todayStart yardımcıları
│   ├── requests/
│   │   ├── kampus-api.json      # Postman Collection (18 istek, 45 test)
│   │   └── run-results.json     # Test koşum sonuçları
│   ├── .env.example             # Örnek ortam değişkeni
│   ├── .gitignore               # node_modules ve .env engellemesi
│   ├── package.json
│   └── README.md                # Backend sözleşme kılavuzu
└── README.md                     # Ana proje kılavuzu
```

---

## 👨‍💻 Öğrenci Bilgileri
- **Ad Soyad:** Ömer Nacar
- **Öğrenci No:** 2416501085
- **Sprint:** `Sprint 9 · Tam CRUD (PATCH, DELETE ve Sorgular)`
