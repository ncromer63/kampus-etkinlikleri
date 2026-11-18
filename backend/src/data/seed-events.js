import "dotenv/config";
import mongoose from "mongoose";
import { connectDatabase } from "../config/database.js";
import { Event } from "../models/event.model.js";

export const seedEvents = [
  {
    title: "Kariyer Günleri 2026",
    category: "Kariyer",
    date: "2026-10-12",
    location: "A Blok Konferans Salonu",
    description: "Mezunlarla kariyer söyleşileri ve şirket standları.",
    capacity: 120,
  },
  {
    title: "Robotik Atölyesi",
    category: "Yazılım",
    date: "2026-10-20",
    location: "Bilgisayar Laboratuvarı 2",
    description: "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi.",
    capacity: 20,
  },
  {
    title: "Siber Güvenlik Söyleşisi",
    category: "Kariyer",
    date: "2026-10-27",
    location: "B Blok Amfi 1",
    description: "Sektörden bir uzmanla güvenlik kariyeri üzerine sohbet.",
    capacity: 50,
  },
  {
    title: "Web Tasarım Atölyesi",
    category: "Tasarım",
    date: "2026-11-03",
    location: "Bilgisayar Laboratuvarı 1",
    description: "HTML ve CSS ile ilk kişisel sayfanı yap.",
    capacity: 30,
  },
  {
    title: "Yapay Zeka ve Gelecek",
    category: "Yazılım",
    date: "2026-11-10",
    location: "A Blok Konferans Salonu",
    description: "Büyük dil modelleri ve günlük hayattaki uygulamaları.",
    capacity: 150,
  },
  {
    title: "Tasarım İlkeleri ve Tipografi",
    category: "Tasarım",
    date: "2026-11-18",
    location: "Açık Hava Amfisi",
    description: "Kullanıcı deneyimi ve modern tipografi üzerine atölye.",
    capacity: 40,
  },
];

async function runSeed() {
  try {
    await connectDatabase();
    await Event.deleteMany({});
    const created = await Event.insertMany(seedEvents);
    console.log(`[seed] ${created.length} etkinlik eklendi`);
    await mongoose.disconnect();
  } catch (err) {
    console.error("[seed] hata:", err.message);
    process.exit(1);
  }
}

if (process.argv[1]?.replace(/\\/g, '/').endsWith('seed-events.js')) {
  runSeed();
}
