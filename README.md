# Kampüs Etkinlikleri — Sprint 7 (Express ile REST API)

https://kampus-etkinlikleri-seven.vercel.app/

Bu depo, Üniversite Kampüs Etkinlikleri web uygulamasının **Sprint 1–7** aşamalarını içerir. Sprint 7 ile birlikte mimari, **aynı repoda iki bağımsız uygulama** düzenine kavuşmuştur:
- **`frontend/`:** React + Vite + TypeScript ile geliştirilen kullanıcı arayüzü (`localhost:5173` - Bu sprintte değişmedi).
- **`backend/`:** Node.js + Express ile geliştirilen REST API sunucusu (`localhost:3000` - Yeni uygulama, veriler şimdilik bellekte).

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

# Bağımlılıkları kurun (express, cors, dotenv)
npm install

# .env dosyasını oluşturun (.env.example üzerinden)
cp .env.example .env

# Geliştirme modunda başlatın (watch modu aktiftir)
npm run dev

# Testleri otomatik koşturun (19 test assertions)
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
| **GET** | `/health` | Sağlık kontrolü ve öğrenci no | - | `200` | - | **Bu sprint (Sprint 7)** |
| **GET** | `/events` | Etkinlik listesini getirme (Opsiyonel `?category=` filtresi) | Query: `?category=Atölye` | `200` | - | **Bu sprint (Sprint 7)** |
| **GET** | `/events/:id` | Tek etkinlik detayını getirme | - | `200` | `404` | **Bu sprint (Sprint 7)** |
| **POST** | `/events` | Yeni etkinlik kaydı oluşturma | JSON (`title`\*, `category`\*, `date`\*, `time`, `location`, `description`, `capacity`) | `201` | `400` | **Bu sprint (Sprint 7)** |
| **PATCH** | `/events/:id` | Etkinlik bilgilerini güncelleme | JSON (güncellenecek alanlar) | `200` | `400, 404` | **Sprint 9** (Uygulanmayacak) |
| **DELETE** | `/events/:id` | Etkinliği silme | - | `204` | `404` | **Sprint 9** (Uygulanmayacak) |

> ⚠️ **Not:** `PATCH` ve `DELETE` işlemleri **Sprint 9** kapsamında geliştirilecektir; bu sprintte kodlanmaz.

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
├── frontend/                     # React + Vite Arayüzü (Bu sprintte değişmedi)
│   ├── src/
│   │   ├── components/
│   │   ├── data/events.ts        # 6 adet etkinlik mock verisi
│   │   └── types/campus-event.ts
│   ├── package.json
│   └── vercel.json
├── backend/                      # Node.js + Express REST API (Sprint 7 Yeni)
│   ├── src/
│   │   ├── app.js               # Express app, CORS ve JSON middleware
│   │   ├── server.js            # Port dinleyici ve dotenv yükleyici
│   │   ├── routes/
│   │   │   └── event.routes.js  # /events router tanımları
│   │   ├── controllers/
│   │   │   └── event.controller.js # Endpoint iş mantığı
│   │   └── data/
│   │       └── events.js        # Frontend'den birebir taşınan 6 etkinlik (afişsiz)
│   ├── requests/
│   │   └── kampus-api.json      # Postman Collection v2.1.0 (6 test isteği)
│   ├── test-api.js              # 19 kontrol içeren otomatik test betiği
│   ├── audit-check.js           # 12 teslim kuralı denetim betiği
│   ├── .env.example             # Örnek ortam değişkeni (PORT=3000)
│   ├── .gitignore               # node_modules ve .env engellemesi
│   ├── package.json
│   └── README.md                # Backend sözleşme ve API kılavuzu
├── vercel.json
└── README.md                     # Ana proje kılavuzu
```

---

## 📮 Postman Test Koleksiyonu
[`backend/requests/kampus-api.json`](backend/requests/kampus-api.json) dosyası Postman içerisine `Import` edilerek kullanılabilir. İçerdiği 6 istek:
1. `GET {{baseUrl}}/health` (Status 200 OK, `student: "2416501085"`)
2. `GET {{baseUrl}}/events` (Status 200 OK, 6 etkinlik)
3. `GET {{baseUrl}}/events/event-2` (Status 200 OK, Robotik Atölyesi detayı)
4. `GET {{baseUrl}}/events/yok` (Status 404 Not Found, `{ "error": { "message": "Event not found" } }`)
5. `POST {{baseUrl}}/events` (Tam Body) (Status 201 Created, üretilen `id: "event-..."`)
6. `POST {{baseUrl}}/events` (Sadece Title) (Status 400 Bad Request, `{ "error": { "message": "title, category and date are required" } }`)

---

## ✅ Sprint 7 Teslim Kontrol Listesi
- [x] Backend ayrı `backend/` klasöründe
- [x] `npm install` + `npm run dev` hatasız çalışıyor
- [x] Port `.env`'den okunuyor, `.env.example` var
- [x] `.env` ve `node_modules` GitHub'da yok (`.gitignore`)
- [x] Route ve controller ayrı dosyalarda
- [x] `GET /health` JSON'unda `student = 2416501085`
- [x] `GET /events` ve `GET /events/:id` çalışıyor; olmayan id `404`
- [x] `POST /events` `201`; eksik veri `400`
- [x] `backend/README.md`'de REST sözleşmesi (PATCH/DELETE Sprint 9 notuyla)
- [x] 6 istek collection olarak `backend/requests/kampus-api.json`'da
- [x] En az 5 commit, adım adım atılmış
- [x] `data/events.js`'te frontend'den birebir taşınan 6 etkinlik

---

## 👨‍💻 Öğrenci Bilgileri
- **Ad Soyad:** Ömer Nacar
- **Öğrenci No:** 2416501085
- **Sprint Etiketi (Tag):** `sprint-07`
