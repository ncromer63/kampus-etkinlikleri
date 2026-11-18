# Kampüs Etkinlikleri REST API (Sprint 8 - Kalıcı Veri)

Sprint 8 kapsamında Node.js, Express, MongoDB ve Mongoose ile kalıcı veri mimarisine geçirilmiş Kampüs Etkinlikleri Yönetim REST API'si.

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
> **Önemli:** Gerçek bağlantı adresi ve kullanıcı şifresi kesinlikle Git'e yüklenmemeli, sadece yerel `.env` dosyasında tutulmalıdır.

### 3. Örnek Veri Yükleme (Seed)
Veritabanını sıfırlayıp 6 adet standart örnek etkinlik eklemek için:
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

| Metot | Endpoint | Amaç / Açıklama | İstek Gövdesi (Body) / Query | Başarılı | Hata | Durum |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **GET** | `/health` | Sağlık kontrolü ve öğrenci no (`2416501085`) | - | `200` | - | **Aktif** |
| **GET** | `/events` | MongoDB'den etkinlik listesi (`date` artan sıralı) | Query: `?category=Yazılım` (opsiyonel) | `200` | `500` | **Aktif (Mongoose)** |
| **GET** | `/events/:id` | MongoDB `_id` ile tek etkinlik detayı | - | `200` | `404` | **Aktif (Mongoose)** |
| **POST** | `/events` | MongoDB'ye yeni etkinlik kaydı | JSON (`title`\*, `date`\*, `location`\*, `category`\*, `capacity`, `description`) | `201` | `400` | **Aktif (Mongoose)** |

---

## 🏗️ Mimari ve Klasör Yapısı

```
backend/
├── config/
│   └── database.js         # Mongoose bağlantı modülü
├── data/
│   └── seed-events.js      # 6 adet örnek veri seed betiği
├── models/
│   └── event.model.js      # Mongoose Event Schema ve Modeli
├── src/
│   ├── config/database.js
│   ├── controllers/event.controller.js
│   ├── data/seed-events.js
│   ├── models/event.model.js
│   ├── routes/event.routes.js
│   ├── app.js              # Express uygulaması ve Hata Middleware'i
│   └── server.js           # DB bağlantısı ve HTTP dinleme
├── .env.example
├── audit-check.js          # 12 puanlık otomatik teslim kontrol betiği
├── package.json
└── test-api.js             # API test betiği
```
