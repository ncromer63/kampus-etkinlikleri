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

| Metot | Endpoint | Açıklama | İstek Gövdesi (Body) / Query | Başarılı Durum Kodu | Hata Kodları |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GET** | `/health` | Servis sağlık kontrolü ve öğrenci numarası | - | `200 OK` | `500 Internal Server Error` |
| **GET** | `/events` | Tüm etkinlikleri listeler veya kategoriye göre filtreler | Query: `?category=Atölye` (opsiyonel) | `200 OK` | `500 Internal Server Error` |
| **GET** | `/events/:id` | Belirtilen ID'ye sahip etkinliğin detayını getirir | - | `200 OK` | `404 Not Found` |
| **POST** | `/events` | Yeni etkinlik oluşturur | JSON (title*, category*, date*, time, location, description, capacity) | `201 Created` | `400 Bad Request` |
| **PATCH** | `/events/:id` | Etkinlik bilgilerini kısmi olarak günceller | JSON (güncellenecek alanlar) | `200 OK` | `400 Bad Request`, `404 Not Found` |
| **DELETE** | `/events/:id` | Etkinliği siler | - | `200 OK` veya `204 No Content` | `404 Not Found` |

\* ile işaretli alanlar zorunludur.

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
- **Başarılı Yanıt (200 OK):**
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
  }
]
```

### 3. Etkinlik Detayı
- **URL:** `GET /events/:id`
- **Başarılı Yanıt (200 OK):** Belirtilen etkinliğin nesnesi döner.
- **Bulunamadı Yanıtı (404 Not Found):**
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
- **Başarılı Yanıt (201 Created):** Oluşturulan yeni etkinlik nesnesi döner.
