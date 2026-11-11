# Kampüs Etkinlikleri REST API (Sprint 7)

Sprint 7 kapsamında Node.js ve Express ile geliştirilmiş Kampüs Etkinlikleri Yönetim REST API'si.

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
Varsayılan port `3000`'dir.

### 3. Sunucuyu Başlatma
- **Geliştirme Modu (Hot reload - Node --watch):**
  ```bash
  npm run dev
  ```
- **Canlı / Standart Çalıştırma:**
  ```bash
  npm start
  ```

---

## 📋 REST API Sözleşmesi

| Metot | Endpoint | Amaç / Açıklama | İstek Gövdesi (Body) / Query | Başarılı | Hata | Durum |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **GET** | `/health` | Sağlık kontrolü ve öğrenci no | - | `200` | - | **Bu sprint (Sprint 7)** |
| **GET** | `/events` | Etkinlik listesini getirir (kategori filtreli veya tümü) | Query: `?category=Atölye` (opsiyonel) | `200` | - | **Bu sprint (Sprint 7)** |
| **GET** | `/events/:id` | Tek etkinlik detayını getirir | - | `200` | `404` | **Bu sprint (Sprint 7)** |
| **POST** | `/events` | Yeni etkinlik kaydeder | JSON (`title`\*, `category`\*, `date`\*, `time`, `location`, `description`, `capacity`) | `201` | `400` | **Bu sprint (Sprint 7)** |
| **PATCH** | `/events/:id` | Etkinlik bilgilerini günceller | JSON (güncellenecek alanlar) | `200` | `400`, `404` | **Sprint 9** (Uygulanmayacak) |
| **DELETE** | `/events/:id` | Etkinliği siler | - | `204` | `404` | **Sprint 9** (Uygulanmayacak) |

\* ile işaretli alanlar zorunludur.

> ⚠️ **Önemli Not:** `PATCH /events/:id` ve `DELETE /events/:id` işlemleri **Sprint 9** kapsamında uygulanacaktır. Bu sprintte (Sprint 7) yalnızca GET ve POST rotaları aktiftir.

---

## 🔍 Endpoint Detayları ve Örnek İstekler

### 1. Sağlık Kontrolü
- **URL:** `GET /health`
- **Başarılı Yanıt (200 OK):**
```json
{
  "status": "ok",
  "student": "2416501085"
}
```

### 2. Etkinlikleri Listeleme & Filtreleme
- **URL:** `GET /events`
- **Filtreli URL:** `GET /events?category=Atölye`
- **Başarılı Yanıt (200 OK) [Mevcut Backend Verisi]:**
```json
[
  {
    "id": "event-1",
    "title": "Kariyer Günleri 2026",
    "category": "Seminer",
    "date": "2026-10-12",
    "time": "14:00",
    "location": "A Blok Konferans Salonu",
    "description": "Mezunlarla kariyer söyleşileri ve şirket standları.",
    "capacity": 120
  },
  {
    "id": "event-2",
    "title": "Robotik Atölyesi",
    "category": "Atölye",
    "date": "2026-10-20",
    "time": "10:00",
    "location": "Bilgisayar Laboratuvarı 2",
    "description": "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi.",
    "capacity": 20
  }
]
```

### 3. Etkinlik Detayı
- **URL:** `GET /events/event-2`
- **Başarılı Yanıt (200 OK) [Mevcut Backend Verisi]:**
```json
{
  "id": "event-2",
  "title": "Robotik Atölyesi",
  "category": "Atölye",
  "date": "2026-10-20",
  "time": "10:00",
  "location": "Bilgisayar Laboratuvarı 2",
  "description": "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi.",
  "capacity": 20
}
```
- **Bulunamadı Yanıtı (404 Not Found - Örn. `GET /events/yok`):**
```json
{
  "error": {
    "message": "Event not found"
  }
}
```

### 4. Yeni Etkinlik Ekleme
- **URL:** `POST /events`
- **Header:** `Content-Type: application/json`
- **İstek Gövdesi:**
```json
{
  "title": "Açık Kaynak Hackathonu",
  "category": "Yarışma",
  "date": "2026-11-25",
  "time": "09:00",
  "location": "Mühendislik Fakültesi",
  "description": "24 saatlik açık kaynak kod maratonu.",
  "capacity": 100
}
```
- **Zorunlu Alan Eksikse (400 Bad Request):**
```json
{
  "error": {
    "message": "title, category and date are required"
  }
}
```
- **Başarılı Yanıt (201 Created):**
```json
{
  "id": "event-1794383373195",
  "title": "Açık Kaynak Hackathonu",
  "category": "Yarışma",
  "date": "2026-11-25",
  "time": "09:00",
  "location": "Mühendislik Fakültesi",
  "description": "24 saatlik açık kaynak kod maratonu.",
  "capacity": 100
}
```

---

## 🧪 Postman & Test İstekleri

Projede yer alan `requests/kampus-api.json` dosyası Postman Collection v2.1.0 formatındadır. Postman veya benzeri API istemcilerine doğrudan içe aktarılabilir.

### Koleksiyondaki 6 İstek:
1. `GET {{baseUrl}}/health` — Status: `200 OK` (Sağlık kontrolü ve öğrenci no)
2. `GET {{baseUrl}}/events` — Status: `200 OK` (Tüm etkinlikler - 6 kayıt)
3. `GET {{baseUrl}}/events/event-2` — Status: `200 OK` (Robotik Atölyesi detayı)
4. `GET {{baseUrl}}/events/yok` — Status: `404 Not Found` (Bulunamayan etkinlik: Event not found)
5. `POST {{baseUrl}}/events` — Status: `201 Created` (Tam body ile yeni etkinlik)
6. `POST {{baseUrl}}/events` — Status: `400 Bad Request` (Sadece title ile eksik veri)

### Otomatik Testleri Çalıştırma:
```bash
npm test
```
