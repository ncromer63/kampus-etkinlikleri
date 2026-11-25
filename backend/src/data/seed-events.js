import "dotenv/config";
import mongoose from "mongoose";
import { connectDatabase } from "../config/database.js";
import { Event } from "../models/event.model.js";

export const seedEvents = [
  {
    title: "Kariyer Günleri 2026",
    category: "Kariyer",
    date: "01-12-2026",
    location: "A Blok Konferans Salonu",
    description: "Mezunlarla kariyer söyleşileri ve şirket standları.",
    capacity: 120,
  },
  {
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "15-10-2026",
    location: "Bilgisayar Laboratuvarı 2",
    description: "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi.",
    capacity: 20,
  },
  {
    title: "Siber Güvenlik Söyleşisi",
    category: "Kariyer",
    date: "08-12-2026",
    location: "B Blok Amfi 1",
    description: "Sektörden bir uzmanla güvenlik kariyeri üzerine sohbet.",
    capacity: 50,
  },
  {
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    date: "05-11-2026",
    location: "Bilgisayar Laboratuvarı 1",
    description: "HTML ve CSS ile ilk kişisel sayfanı yap.",
    capacity: 30,
  },
  {
    title: "Kodlama Yarışması",
    category: "Yazılım",
    date: "15-12-2026",
    location: "Mühendislik Fakültesi",
    description: "Algoritma ve yazılım geliştirme yarışması.",
    capacity: 60,
  },
  {
    title: "Yapay Zekâ Semineri",
    category: "Yazılım",
    date: "17-12-2026",
    location: "A Blok Konferans Salonu",
    description: "Büyük dil modelleri ve günlük hayattaki uygulamaları.",
    capacity: 150,
  },
];

export async function runSeed() {
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

if (process.argv[1] && process.argv[1].includes("seed")) {
  runSeed();
}
