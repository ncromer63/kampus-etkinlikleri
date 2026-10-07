// event-form.js - Ekleme ve Güncelleme Formu Modülü
import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const formMesaj = document.querySelector("#form-mesaj");

if (form) {
  const isUpdateMode = form.dataset.mode === "guncelle";
  let activeEventId = null;

  // Güncelleme modu kontrolü
  if (isUpdateMode) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const etkinlik = events.find((e) => e.id === id);

    if (id && etkinlik) {
      activeEventId = etkinlik.id;
      // Form alanlarını doldur
      if (form.elements["ad"]) form.elements["ad"].value = etkinlik.title;
      if (form.elements["tarih"]) form.elements["tarih"].value = etkinlik.date;
      if (form.elements["saat"]) form.elements["saat"].value = etkinlik.time;
      if (form.elements["yer"]) form.elements["yer"].value = etkinlik.location;
      if (form.elements["kontenjan"]) form.elements["kontenjan"].value = etkinlik.capacity || "";
      if (form.elements["aciklama"]) form.elements["aciklama"].value = etkinlik.description || "";
    } else {
      // id yoksa veya etkinlik bulunamazsa formu gizle ve uyarı göster
      form.outerHTML = `
        <div class="uyari-kutusu">
          <p>Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
          <div class="buton-grubu">
            <a href="etkinlikler.html" class="btn btn-primary">Etkinliklere git</a>
          </div>
        </div>
      `;
    }
  }

  // Kategori seçeneklerini doldur (Eğer select içinde sadece 1 varsayılan seçenek varsa)
  const kategoriSelect = form.elements ? form.elements["kategori"] : null;
  if (kategoriSelect) {
    if (kategoriSelect.options.length <= 1) {
      const kategoriler = [...new Set(events.map((e) => e.category))];
      kategoriler.forEach((kat) => {
        const opt = document.createElement("option");
        opt.value = kat;
        opt.textContent = kat;
        kategoriSelect.appendChild(opt);
      });
    }

    if (isUpdateMode && activeEventId) {
      const etkinlik = events.find((e) => e.id === activeEventId);
      if (etkinlik) {
        kategoriSelect.value = etkinlik.category;
      }
    }
  }

  // Form Gönderim Yakalama (Submit Event)
  if (form && form.parentNode) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const fd = new FormData(form);
      const rawCapacity = fd.get("kontenjan");
      let capacityVal = null;
      if (rawCapacity !== null && rawCapacity.toString().trim() !== "") {
        capacityVal = Number(rawCapacity);
      }

      const data = {
        title: (fd.get("ad") || "").trim(),
        category: (fd.get("kategori") || "").trim(),
        date: (fd.get("tarih") || "").trim(),
        time: (fd.get("saat") || "").trim(),
        location: (fd.get("yer") || "").trim(),
        capacity: capacityVal,
        description: (fd.get("aciklama") || "").trim()
      };

      // Tüm hata alanlarını ve aria-invalid durumlarını sıfırla
      const fields = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"];
      fields.forEach((field) => {
        const inputElem = form.elements[field];
        const errorElem = document.querySelector(`#${field}-hata`);
        if (inputElem) {
          inputElem.removeAttribute("aria-invalid");
        }
        if (errorElem) {
          errorElem.textContent = "";
        }
      });

      const errors = {};

      // 1. Ad doğrulaması (En az 3 karakter)
      if (!data.title || data.title.length < 3) {
        errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
      }

      // 2. Kategori doğrulaması (Seçilmiş olmalı)
      if (!data.category) {
        errors.kategori = "Bir kategori seçin.";
      }

      // 3. Tarih doğrulaması (Boş olamaz)
      if (!data.date) {
        errors.tarih = "Tarih seçin.";
      }

      // 4. Saat doğrulaması (Boş olamaz)
      if (!data.time) {
        errors.saat = "Saat seçin.";
      }

      // 5. Yer doğrulaması (Boş olamaz)
      if (!data.location) {
        errors.yer = "Yer bilgisini yazın.";
      }

      // 6. Kontenjan doğrulaması (Girildiyse 1-1000 arasında olmalı)
      if (rawCapacity !== null && rawCapacity.toString().trim() !== "") {
        if (isNaN(capacityVal) || capacityVal < 1 || capacityVal > 1000) {
          errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalıdır.";
        }
      }

      // Hataları ekranda göster
      const errorKeys = Object.keys(errors);
      if (errorKeys.length > 0) {
        errorKeys.forEach((field) => {
          const inputElem = form.elements[field];
          const errorElem = document.querySelector(`#${field}-hata`);
          if (inputElem) {
            inputElem.setAttribute("aria-invalid", "true");
          }
          if (errorElem) {
            errorElem.textContent = errors[field];
          }
        });

        if (formMesaj) {
          formMesaj.innerHTML = "";
        }
        return;
      }

      // Hata yoksa: Çıktı nesnesini hazırla
      const generatedId = isUpdateMode && activeEventId ? activeEventId : `event-${events.length + 1}`;
      const outputData = {
        id: generatedId,
        title: data.title,
        category: data.category,
        date: data.date,
        time: data.time,
        location: data.location,
        capacity: data.capacity,
        description: data.description
      };

      const baslikMetni = isUpdateMode
        ? "Etkinlik güncellendi (bu sprintte kaydedilmez):"
        : "Etkinlik oluşturuldu (bu sprintte kaydedilmez):";

      if (formMesaj) {
        formMesaj.innerHTML = `
          <div class="basari-kutusu">
            <p><strong>${baslikMetni}</strong></p>
            <pre>${JSON.stringify(outputData, null, 2)}</pre>
          </div>
        `;
        formMesaj.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }
}
