// event-detail.js - Detay Sayfası Modülü
import { events, formatDate } from "./data.js";

const container = document.querySelector("#detay");

if (container) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const event = events.find((e) => e.id === id);

  if (!event) {
    document.title = "Etkinlik bulunamadı - Kampüs Etkinlikleri";
    container.innerHTML = `
      <div class="hata-kutusu">
        <p>"${id ? id : "Geçersiz"}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.</p>
        <div class="buton-grubu">
          <a href="etkinlikler.html" class="btn btn-secondary">← Listeye dön</a>
        </div>
      </div>
    `;
  } else {
    document.title = `${event.title} - Kampüs Etkinlikleri`;
    const formattedDate = formatDate(event.date);

    // Başlık alanını da güncelle (eğer h1 varsa)
    const sayfaBaslik = document.querySelector("h1.etkinlik-baslik");
    if (sayfaBaslik) {
      sayfaBaslik.textContent = event.title;
    }

    container.innerHTML = `
      <article class="detay-karti">
        <div class="detay-grid">
          <div class="afis-sutun">
            <figure class="afis-cerceve">
              <div class="afis-gorsel">
                <div class="afis-icerik">
                  <div class="afis-badge">${event.category}</div>
                  <h2 class="afis-baslik">${event.title}</h2>
                  <div class="afis-yil">2026</div>
                  <div class="afis-alt-bilgi">${formattedDate} · ${event.location}</div>
                </div>
              </div>
              <figcaption>${event.title} afişi</figcaption>
            </figure>
          </div>

          <div class="kunye-sutun">
            <h2>Etkinlik Künyesi</h2>
            <dl class="kunye-listesi">
              <dt>Tarih</dt>
              <dd><time datetime="${event.date}T${event.time}">${formattedDate}, ${event.time}</time></dd>

              <dt>Yer</dt>
              <dd>${event.location}</dd>

              <dt>Kategori</dt>
              <dd>${event.category}</dd>

              <dt>Kontenjan</dt>
              <dd>${event.capacity ? `${event.capacity} kişi` : "Belirtilmedi"}</dd>
            </dl>
          </div>
        </div>

        <section class="aciklama-alani">
          <h2>Açıklama</h2>
          <p>${event.description}</p>
        </section>

        <div class="detay-eylemler">
          <a href="etkinlikler.html" class="btn btn-secondary">← Listeye dön</a>
          <a href="etkinlik-guncelle.html?id=${event.id}" class="btn btn-primary">Bu etkinliği güncelle</a>
        </div>
      </article>
    `;
  }
}
