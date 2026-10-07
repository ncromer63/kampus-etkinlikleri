// event-list.js - Liste ve Ana Sayfa Modülü
import { events, formatDate } from "./data.js";

// Kart HTML'i üreten fonksiyon
function createCard(event) {
  const formattedDate = formatDate(event.date);
  return `
    <article class="kart" data-id="${event.id}">
      <h2>${event.title}</h2>
      <p class="kategori">${event.category}</p>
      <p class="tarih-saat">Tarih: ${formattedDate}, ${event.time}</p>
      <p class="yer">Yer: ${event.location}</p>
      <p class="kontenjan">Kontenjan: ${event.capacity ? `${event.capacity} kişi` : "Belirtilmedi"}</p>
      <p class="aciklama">${event.description}</p>
      <a href="etkinlik-detay.html?id=${event.id}" class="detay-link">Detayları gör</a>
    </article>
  `;
}

// Container'ı seç
const list = document.querySelector("#etkinlik-listesi");

// Diziyi ekrana basan fonksiyon
function render(dizi) {
  if (!list) return;
  list.innerHTML = dizi.map(createCard).join("");
}

// Sayfa yüklendiğinde çalışacak ana mantık
if (list) {
  // Eğer container'da data-limit varsa (Ana Sayfa)
  if (list.dataset.limit) {
    const limit = Number(list.dataset.limit);
    const yaklasan = [...events]
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, limit);
    render(yaklasan);
  } else {
    // Etkinlikler sayfası - varsayılan tüm liste
    render(events);
  }
}

// Filtre Alanları (Etkinlikler Sayfası)
const filtreFormu = document.querySelector("#filtre-formu");
const aramaInput = document.querySelector("#arama");
const kategoriSelect = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");

if (filtreFormu && aramaInput && kategoriSelect) {
  // Kategorileri veriden tekil olarak üret (new Set)
  const kategoriler = [...new Set(events.map((e) => e.category))];
  kategoriler.forEach((kategori) => {
    const option = document.createElement("option");
    option.value = kategori;
    option.textContent = kategori;
    kategoriSelect.appendChild(option);
  });

  // Filtreleme fonksiyonu
  function filtrele() {
    const aranan = aramaInput.value.trim().toLocaleLowerCase("tr-TR");
    const secilenKategori = kategoriSelect.value;

    const sonuc = events.filter((e) => {
      const baslikUyuyor = e.title.toLocaleLowerCase("tr-TR").includes(aranan);
      const aciklamaUyuyor = (e.description || "").toLocaleLowerCase("tr-TR").includes(aranan);
      const yerUyuyor = (e.location || "").toLocaleLowerCase("tr-TR").includes(aranan);
      const kategoriMetinUyuyor = e.category.toLocaleLowerCase("tr-TR").includes(aranan);

      const metinUyuyor = !aranan || baslikUyuyor || aciklamaUyuyor || yerUyuyor || kategoriMetinUyuyor;
      const kategoriUyuyor = !secilenKategori || e.category === secilenKategori;

      return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);

    if (sonucSatiri) {
      if (sonuc.length === 0) {
        sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
      } else {
        sonucSatiri.textContent = `${sonuc.length} etkinlik listeleniyor.`;
      }
    }
  }

  // Dinleyiciler
  aramaInput.addEventListener("input", filtrele);
  kategoriSelect.addEventListener("change", filtrele);
  filtreFormu.addEventListener("submit", (e) => e.preventDefault());

  // İlk açılış sonuç mesajı
  if (sonucSatiri) {
    sonucSatiri.textContent = `${events.length} etkinlik listeleniyor.`;
  }
}
