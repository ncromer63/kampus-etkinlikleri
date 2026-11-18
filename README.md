# Kampüs Etkinlikleri — Sprint 8 (MongoDB ve Mongoose ile Kalıcı Veri)

https://kampus-etkinlikleri-seven.vercel.app/

Bu depo, Üniversite Kampüs Etkinlikleri web uygulamasının **Sprint 1–8** aşamalarını içerir.
- **`frontend/`:** React + Vite + TypeScript ile geliştirilen kullanıcı arayüzü (`localhost:5173` - Dokunulmadı).
- **`backend/`:** Node.js + Express + MongoDB & Mongoose ile geliştirilen kalıcı REST API sunucusu (`localhost:3000`).

---

## 🌐 Yayın ve Canlı Bağlantılar
- **Vercel Canlı Link (Frontend):** [https://kampus-etkinlikleri-seven.vercel.app/](https://kampus-etkinlikleri-seven.vercel.app/)
- **GitHub Deposu (Public):** [https://github.com/ncromer63/kampus-etkinlikleri](https://github.com/ncromer63/kampus-etkinlikleri)
- **Vercel Yapılandırması:** Root Directory: `frontend`, Framework Preset: `Vite`

---

## 🚀 Yerel Kurulum ve Çalıştırma

### 1. Backend API Sunucusu (Port 3000)
```bash
# Backend dizinine geçin
cd backend

# Bağımlılıkları kurun (express, cors, dotenv, mongoose)
npm install

# .env dosyasını oluşturun (.env.example üzerinden)
cp .env.example .env

# .env içerisine MongoDB bağlantı adresinizi (MONGODB_URI) tanımlayın:
# MONGODB_URI=mongodb+srv://<kullanici>:<sifre>@cluster0.xxx.mongodb.net/kampus?retryWrites=true&w=majority

# Örnek veritabanı tohumlamasını (seed) çalıştırın (6 adet kayıt)
npm run seed

# Geliştirme modunda başlatın (watch modu aktiftir)
npm run dev

# Teslim denetimini ve otomatik testleri çalıştırın
node audit-check.js
npm test
```
Sunucu adresi: `http://localhost:3000`

### 2. Frontend Uygulaması (Port 5173)
```bash
# Frontend dizinine geçin
cd frontend

# Bağımlılıkları kurun
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```
Uygulama adresi: `http://localhost:5173`

---

## 📋 REST API Sözleşmesi

| Yöntem | Endpoint | Amaç / Açıklama | İstek Gövdesi / Query | Başarılı | Hata | Durum |
|:---:|---|---|---|:---:|:---:|:---:|
| **GET** | `/health` | Sağlık kontrolü ve öğrenci no (`2416501085`) | - | `200` | - | **Aktif** |
| **GET** | `/events` | MongoDB'den etkinlik listesi (`date` artan sıralı) | Query: `?category=Yazılım` (opsiyonel) | `200` | `500` | **Aktif (Mongoose)** |
| **GET** | `/events/:id` | MongoDB `_id` ile tek etkinlik detayı | - | `200` | `404` | **Aktif (Mongoose)** |
| **POST** | `/events` | MongoDB'ye yeni etkinlik kaydı | JSON (`title`\*, `date`\*, `location`\*, `category`\*, `capacity`, `description`) | `201` | `400` | **Aktif (Mongoose)** |
| **PATCH** | `/events/:id` | Etkinlik bilgilerini güncelleme | JSON (güncellenecek alanlar) | `200` | `400, 404` | **Sprint 9** (Gelecek Sprint) |
| **DELETE** | `/events/:id` | Etkinliği silme | - | `204` | `404` | **Sprint 9** (Gelecek Sprint) |

### Standart Hata Yanıt Formatı:
```json
{
  "error": {
    "message": "Event not found"
  }
}
```

---

## 📂 Depo Klasör Yapısı

```text
kampus-etkinlikleri/
├── frontend/                     # React + Vite Arayüzü (Dokunulmadı)
│   ├── src/
│   │   ├── components/
│   │   ├── data/events.ts
│   │   └── types/campus-event.ts
│   ├── package.json
│   └── vercel.json
├── backend/                      # Node.js + Express + MongoDB & Mongoose REST API
│   ├── config/
│   │   └── database.js          # Veritabanı bağlantı modülü
│   ├── data/
│   │   └── seed-events.js       # 6 adet örnek veri seed betiği
│   ├── models/
│   │   └── event.model.js       # Event Mongoose Schema & Model
│   ├── src/
│   │   ├── app.js               # Express app, CORS, JSON ve Hata Middleware'i
│   │   ├── server.js            # Önce DB bağlantısı, ardından HTTP dinleme
│   │   ├── config/database.js   # DB bağlantı mantığı
│   │   ├── models/event.model.js # Event Schema
│   │   ├── data/seed-events.js  # Tohumlama scripti
│   │   ├── routes/event.routes.js # /events router tanımları
│   │   └── controllers/event.controller.js # find, findById, create iş mantığı
│   ├── requests/
│   │   └── kampus-api.json      # Postman Collection (6 test isteği)
│   ├── test-api.js              # API uçtan uca test betiği
│   ├── audit-check.js           # 12 puanlık otomatik teslim denetim betiği
│   ├── .env.example             # Örnek ortam değişkeni (PORT=3000, MONGODB_URI=...)
│   ├── .gitignore               # node_modules ve .env engellemesi
│   ├── package.json
│   └── README.md                # Backend sözleşme ve API kılavuzu
├── vercel.json
└── README.md                     # Ana proje kılavuzu
```

---

## 📮 Postman Test Koleksiyonu
[`backend/requests/kampus-api.json`](backend/requests/kampus-api.json) dosyası Postman içerisine `Import` edilerek kullanılabilir:
1. `GET {{baseUrl}}/health` (Status 200 OK, `student: "2416501085"`)
2. `GET {{baseUrl}}/events` (Status 200 OK, 6 etkinlik, MongoDB `_id` ve timestamps ile)
3. `GET {{baseUrl}}/events/{{eventId}}` (Status 200 OK, geçerli `_id` ile tek etkinlik)
4. `GET {{baseUrl}}/events/111111` (Status 404 Not Found, geçersiz id kontrolü)
5. `POST {{baseUrl}}/events` (Tam Body) (Status 201 Created, React 19 Workshop)
6. `POST {{baseUrl}}/events` (Sadece Title) (Status 400 Bad Request, eksik veri doğrulaması)

---

## ✅ Sprint 8 Teslim Kontrol Listesi
- [x] Temel hazırlık: `npm install` + `npm run dev` hatasız çalışıyor (1 puan)
- [x] Bağlantı: `config/database.js`'te URI `.env`'den, `process.env.MONGODB_URI` (2 puan)
- [x] Schema: `required`, `trim`, `timestamps: true` ve özel kurallar (minlength, category enum, capacity min) (2 puan)
- [x] Seed: `npm run seed` 6 kayıt, iki kez üst üste çalışınca da tam 6 kayıt (2 puan)
- [x] GET: Liste ve detay Mongoose'dan; olmayan ve geçersiz id `404` (500 değil) (2 puan)
- [x] POST: `201`; eksik veri `400` ve sunucu çökmüyor (2 puan)
- [x] Kalıcılık & Hata Middleware: 4 parametreli hata yakalayıcı ve sunucu yeniden başlatılınca kayıtlar duruyor (1 puan)
- [x] `GET /health` JSON'unda `student = "2416501085"`
- [x] Git geçmişinde ve dosyalarda gerçek Atlas şifresi yok
- [x] `.env` ve `node_modules` GitHub takip dışı (`.gitignore`)

---

## 👨‍💻 Öğrenci Bilgileri
- **Ad Soyad:** Ömer Nacar
- **Öğrenci No:** 2416501085
- **Sprint:** `Sprint 8 - Kalıcı Veri (MongoDB & Mongoose)`
