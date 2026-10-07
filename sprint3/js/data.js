// data.js - Kampüs Etkinlikleri Veri Modülü
export const events = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "2026-10-12",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Mezunlarla kariyer söyleşileri ve şirket standları.",
    capacity: 120
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "2026-10-20",
    time: "10:00",
    location: "Bilgisayar Laboratuvarı 2",
    description: "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi.",
    capacity: 20
  },
  {
    id: "event-3",
    title: "Siber Güvenlik Söyleşisi",
    category: "Söyleşi",
    date: "2026-10-27",
    time: "13:00",
    location: "B Blok Amfi 1",
    description: "Sektörden bir uzmanla güvenlik kariyeri üzerine sohbet.",
    capacity: 50
  },
  {
    id: "event-4",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    date: "2026-11-03",
    time: "15:00",
    location: "Bilgisayar Laboratuvarı 1",
    description: "HTML ve CSS ile ilk kişisel sayfanı yap.",
    capacity: 30
  },
  {
    id: "event-5",
    title: "Yapay Zeka ve Gelecek",
    category: "Seminer",
    date: "2026-11-10",
    time: "11:00",
    location: "A Blok Konferans Salonu",
    description: "Büyük dil modelleri ve günlük hayattaki uygulamaları.",
    capacity: 150
  },
  {
    id: "event-6",
    title: "Akustik Kampüs Konseri",
    category: "Konser",
    date: "2026-11-18",
    time: "18:30",
    location: "Açık Hava Amfisi",
    description: "Müzik kulübü öğrencilerinden akustik performanslar.",
    capacity: 300
  }
];

// Tarih formatlama yardımcı fonksiyonu (GG Ay YYYY formatı: örn. 12 Ekim 2026)
export function formatDate(dateStr) {
  if (!dateStr) return "";
  if (dateStr.includes("-")) {
    const parts = dateStr.split("-");
    if (parts[0].length === 4) {
      // YYYY-MM-DD
      const year = Number(parts[0]);
      const month = Number(parts[1]) - 1;
      const day = Number(parts[2]);
      const d = new Date(year, month, day);
      return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
    } else {
      // GG-AA-YYYY
      const day = Number(parts[0]);
      const month = Number(parts[1]) - 1;
      const year = Number(parts[2]);
      const d = new Date(year, month, day);
      return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
    }
  }
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}
