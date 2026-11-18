import "dotenv/config";
import mongoose from "mongoose";
import app from "./src/app.js";
import { connectDatabase } from "./src/config/database.js";
import { Event } from "./src/models/event.model.js";
import { seedEvents } from "./src/data/seed-events.js";

const PORT = 3002;

async function runTests() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI ortam değişkeni .env dosyasında tanımlı değil!');
    console.error('Lütfen backend/.env dosyanıza MONGODB_URI ekleyiniz.');
    process.exit(1);
  }

  console.log('Connecting to MongoDB...');
  try {
    await connectDatabase();
  } catch (err) {
    console.error('❌ MongoDB bağlantı hatası:', err.message);
    process.exit(1);
  }

  // Seed verilerini hazırla (deleteMany + insertMany)
  await Event.deleteMany({});
  await Event.insertMany(seedEvents);
  console.log('Seed verileri (6 adet) yüklendi.');

  const server = app.listen(PORT, async () => {
    console.log(`Test sunucusu http://localhost:${PORT} üzerinde başlatıldı.`);
    const baseUrl = `http://localhost:${PORT}`;

    let passed = 0;
    let failed = 0;

    function assert(condition, message) {
      if (condition) {
        console.log(`[PASS] ${message}`);
        passed++;
      } else {
        console.error(`[FAIL] ${message}`);
        failed++;
      }
    }

    try {
      // 1. GET /health
      console.log('\n--- 1. GET /health (Beklenen Çıktı 1/6) ---');
      const res1 = await fetch(`${baseUrl}/health`);
      assert(res1.status === 200, `Status code 200 (actual: ${res1.status})`);
      const data1 = await res1.json();
      assert(data1.status === 'ok', `status: 'ok'`);
      assert(data1.student === '2416501085', `student: '2416501085'`);

      // 2. GET /events
      console.log('\n--- 2. GET /events (Beklenen Çıktı 2/6) ---');
      const res2 = await fetch(`${baseUrl}/events`);
      assert(res2.status === 200, `Status code 200 (actual: ${res2.status})`);
      const data2 = await res2.json();
      assert(Array.isArray(data2), 'Response is array');
      assert(data2.length === 6, `Event count is 6 (actual: ${data2.length})`);
      const firstEvent = data2[0];
      assert(Boolean(firstEvent._id), 'First event has Mongo _id');
      assert(Boolean(firstEvent.createdAt), 'First event has createdAt');

      // 3. GET /events/:id
      console.log('\n--- 3. GET /events/:id (Beklenen Çıktı 3/6) ---');
      const res3 = await fetch(`${baseUrl}/events/${firstEvent._id}`);
      assert(res3.status === 200, `Status code 200 (actual: ${res3.status})`);
      const data3 = await res3.json();
      assert(data3._id === firstEvent._id, `Returned event matches requested _id`);

      // 4. GET /events/111111 (Geçersiz id -> 404)
      console.log('\n--- 4. GET /events/111111 (Beklenen Çıktı 4/6 - Geçersiz id) ---');
      const res4 = await fetch(`${baseUrl}/events/111111`);
      assert(res4.status === 404, `Status code 404 for invalid ObjectId (actual: ${res4.status})`);
      const data4 = await res4.json();
      assert(data4?.error?.message === 'Event not found', `Error message is 'Event not found'`);

      // 4b. GET /events/64f51b008101ac087a0b1b99 (Geçerli formatta ama olmayan id -> 404)
      console.log('\n--- 4b. GET /events/64f51b008101ac087a0b1b99 (Bulunmayan id) ---');
      const res4b = await fetch(`${baseUrl}/events/64f51b008101ac087a0b1b99`);
      assert(res4b.status === 404, `Status code 404 for non-existent id (actual: ${res4b.status})`);

      // 5. POST /events (Tam body -> 201)
      console.log('\n--- 5. POST /events (Beklenen Çıktı 5/6 - Geçerli body) ---');
      const newEventPayload = {
        title: "React 19 Workshop",
        date: "2026-12-10",
        location: "Binası D-101",
        category: "Yazılım",
        capacity: 30,
        description: "Yeni hook'lar ve Server Components"
      };
      const res5 = await fetch(`${baseUrl}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEventPayload),
      });
      assert(res5.status === 201, `Status code 201 Created (actual: ${res5.status})`);
      const data5 = await res5.json();
      assert(Boolean(data5._id), 'Created event has _id');
      assert(data5.title === newEventPayload.title, 'Title matches');

      // 6. POST /events (Eksik body -> 400)
      console.log('\n--- 6. POST /events (Beklenen Çıktı 6/6 - Eksik body) ---');
      const res6 = await fetch(`${baseUrl}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: "Eksik etkinlik" }),
      });
      assert(res6.status === 400, `Status code 400 Bad Request (actual: ${res6.status})`);
      const data6 = await res6.json();
      assert(Boolean(data6?.error?.message), 'Error message returned for validation failure');

      // 7. GET /events?category=Yazılım
      console.log('\n--- 7. GET /events?category=Yazılım (Kategori filtreleme) ---');
      const res7 = await fetch(`${baseUrl}/events?category=Yazılım`);
      assert(res7.status === 200, `Status code 200`);
      const data7 = await res7.json();
      const allSoftware = data7.every(e => e.category === 'Yazılım');
      assert(allSoftware, 'All returned events have category Yazılım');

    } catch (err) {
      console.error('Test execution error:', err);
      failed++;
    } finally {
      server.close();
      await mongoose.disconnect();
      console.log(`\n========================================`);
      console.log(`Test Sonuçları: ${passed} Başarılı, ${failed} Başarısız`);
      console.log(`========================================\n`);
      if (failed > 0) process.exit(1);
    }
  });
}

runTests();
