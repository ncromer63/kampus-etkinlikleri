# Kampüs Etkinlikleri REST API (Sprint 9 · Tam CRUD)

Sprint 9 kapsamında Node.js, Express, MongoDB ve Mongoose ile tam CRUD (PATCH, DELETE), arama/filtreleme (`?search`, `?category`), yaklaşan etkinlikler (`/upcoming`) ve "GG-AA-YYYY" tarih standardına geçirilmiş Kampüs Etkinlikleri Yönetim REST API'si.

## 🚀 Başlangıç ve Kurulum

### 1. Bağımlılıkların Yüklenmesi
```bash
npm install
```

### 2. Ortam Değişkenlerinin Yapılandırılması
`.env.example` dosyasından bir `.env` dosyası oluşturun:
```bash
cp .env.example .env
```
`.env` dosyanıza MongoDB Atlas bağlantı adresinizi ekleyin:
```env
PORT=3000
MONGODB_URI=mongodb+srv://<kullanici>:<sifre>@cluster.mongodb.net/kampus?retryWrites=true&w=majority
```

### 3. Örnek Veri Yükleme (Seed)
Veritabanını sıfırlayıp en az 2'si geçmiş tarihli 6 adet standart örnek etkinlik eklemek için:
```bash
npm run seed
```

### 4. Sunucuyu Başlatma
- **Geliştirme Modu (Hot reload - Node --watch):**
  ```bash
  npm run dev
  ```
- **Standart Başlatma:**
  ```bash
  npm start
  ```

---

## 📋 REST API Sözleşmesi

| Metot | Endpoint | Amaç / Açıklama | İstek Gövdesi / Query | Başarılı | Hata | Durum |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| **GET** | `/health` | Sağlık kontrolü ve öğrenci no (`2416501085`) | - | `200` | — | **Çalışıyor** |
| **GET** | `/events` | Etkinlik listesi (Arama ve kategori filtreli) | Query: `?search=atölye&category=Yazılım` | `200` | — | **Çalışıyor** |
| **GET** | `/events/upcoming` | Yaklaşan etkinlikler (Bugün ve sonrası, tarihe göre sıralı) | - | `200` | — | **Çalışıyor** |
| **GET** | `/events/:id` | MongoDB `_id` ile tek etkinlik detayı | - | `200` | `404` | **Çalışıyor** |
| **POST** | `/events` | Yeni etkinlik oluşturma | JSON (`title`\*, `date`\*, `location`\*, `category`\*, `capacity`, `description`) | `201` | `400` | **Çalışıyor** |
| **PATCH** | `/events/:id` | Etkinlik güncelleme (Sadece gönderilen alanlar) | JSON (güncellenecek alanlar) | `200` | `400`, `404` | **Çalışıyor** |
| **DELETE** | `/events/:id` | Etkinlik silme (Başarılı silmede gövde yok) | - | `204` | `404` | **Çalışıyor** |

### Önemli Standartlar:
- **Tarih Biçimi:** API giriş ve çıkışlarında her yerde `"GG-AA-YYYY"` (örn. `"15-10-2026"`). Veritabanında gerçek Date olarak saklanır.
- **Standart Hata Formatı:** `{ "error": { "message": "..." } }`
- **Geçersiz / Olmayan ID:** Her yerde `404 Not Found`.
- **PATCH Korumalı Alanlar:** `_id`, `createdAt`, `updatedAt`, `__v` güncellenemez (`400 Bad Request`).
- **DELETE Yanıtı:** Başarılı silmede `res.status(204).end()` (gövde yok). İkinci silmede `404 Not Found`.

---

## 🏗️ Mimari ve Klasör Yapısı

```
backend/
├── config/
│   └── database.js              # Mongoose bağlantı modülü
├── data/
│   └── seed-events.js           # 6 adet örnek veri seed betiği (2'si geçmiş tarih)
├── models/
│   └── event.model.js           # Event Mongoose Schema (Date set/get, toJSON getters)
├── src/
│   ├── config/database.js
│   ├── controllers/event.controller.js
│   ├── data/seed-events.js
│   ├── models/event.model.js
│   ├── routes/event.routes.js
│   ├── utils/date.js            # parseDate, formatDate, todayStart
│   ├── app.js                   # Express uygulaması ve Hata Middleware'i
│   └── server.js                # DB bağlantısı ve HTTP dinleme
├── requests/
│   ├── kampus-api.json          # Postman Collection (18 istek, 45 test)
│   └── run-results.json         # Runner test çıktı sonuçları
├── .env.example
├── package.json
└── README.md
```
