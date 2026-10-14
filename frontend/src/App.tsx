import { useEffect, useState } from "react";
import "./App.css";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

const menuItems: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

const categories = [...new Set(events.map((e) => e.category))];

function formatDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const filtered = filterByCategory(
    searchEvents(events, searchText),
    category
  );

  const selected = selectedId
    ? findEventById(events, selectedId)
    : undefined;

  const pageTitle =
    page === "home"
      ? "Ana Sayfa"
      : page === "events"
        ? "Etkinlikler"
        : page === "add"
          ? "Etkinlik Ekle"
          : page === "update"
            ? "Etkinlik Güncelle"
            : selected
              ? selected.title
              : "Etkinlik bulunamadı";

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${pageTitle}`;
  }, [pageTitle]);

  const headerTitle =
    page === "home"
      ? "Kampüs Etkinlikleri"
      : page === "events"
        ? "Tüm Etkinlikler"
        : page === "add"
          ? "Etkinlik Ekle"
          : page === "update"
            ? "Etkinlik Güncelle"
            : selected
              ? selected.title
              : "Kampüs Etkinlikleri";

  const subtitle =
    page === "events"
      ? "Ekim ayında kampüste düzenlenen etkinlikler."
      : page === "home"
        ? "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."
        : null;

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h2>{event.title}</h2>
        <p className="kategori">{event.category}</p>
        <p className="tarih-saat">
          Tarih: {formatDate(event.date)}, {event.time}
        </p>
        <p className="yer">Yer: {event.location}</p>
        <p className="kontenjan">Kontenjan: {event.capacity} kişi</p>
        <p className="aciklama">{event.description}</p>
        <a
          href="#detay"
          className="detay-link"
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör
        </a>
      </article>
    );
  }

  return (
    <>
      <header className="site-baslik">
        <div className="header-container">
          <h1>{headerTitle}</h1>
          {subtitle && <p className="subtitle">{subtitle}</p>}
          <nav className="menu">
            {menuItems.map((item) => {
              const isActive = page === item.page;
              return (
                <a
                  key={item.page}
                  href={`#${item.page}`}
                  className={isActive ? "active" : undefined}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.page);
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      <main>
        {page === "home" && (
          <section>
            <h2 className="section-title">Yaklaşan 2 Etkinlik</h2>
            <section className="etkinlik-listesi">
              {upcoming.map(renderCard)}
            </section>
            <div className="all-events-btn-wrapper">
              <a
                href="#events"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                Tüm etkinlikleri gör
              </a>
            </div>
          </section>
        )}

        {page === "events" && (
          <>
            <form
              className="filtre"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="filtre-grup">
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="Örn. atölye, kariyer"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="filtre-grup">
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as Category | "")
                  }
                >
                  <option value="">Tümü</option>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </form>
            <p id="sonuc">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <section className="etkinlik-listesi">
              {filtered.map(renderCard)}
            </section>
          </>
        )}

        {page === "detail" && !selected && (
          <div className="hata-kutusu">
            <p>
              "{selectedId ?? "Geçersiz"}" numaralı bir etkinlik yok. Listeden
              bir etkinlik seçin.
            </p>
            <div className="buton-grubu">
              <a
                href="#events"
                className="btn btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                ← Listeye dön
              </a>
            </div>
          </div>
        )}

        {page === "detail" && selected && (
          <article className="detay detay-karti">
            <div className="detay-grid">
              {selected.image && (
                <div className="afis-sutun">
                  <figure className="afis-cerceve">
                    <img
                      src={selected.image}
                      alt={`${selected.title} afişi`}
                    />
                    <figcaption>{selected.title} afişi</figcaption>
                  </figure>
                </div>
              )}
              <div className="kunye-sutun">
                <h2>Etkinlik Künyesi</h2>
                <dl className="kunye-listesi">
                  <dt>Tarih</dt>
                  <dd>
                    <time dateTime={`${selected.date}T${selected.time}`}>
                      {formatDate(selected.date)}, {selected.time}
                    </time>
                  </dd>
                  <dt>Yer</dt>
                  <dd>{selected.location}</dd>
                  <dt>Kategori</dt>
                  <dd>{selected.category}</dd>
                  <dt>Kontenjan</dt>
                  <dd>{selected.capacity} kişi</dd>
                </dl>
              </div>
            </div>
            <section className="aciklama-alani">
              <h2>Açıklama</h2>
              <p>{selected.description}</p>
            </section>
            <div className="detay-eylemler">
              <a
                href="#events"
                className="btn btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                ← Listeye dön
              </a>
              <a
                href="#update"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  go("update", selected.id);
                }}
              >
                Bu etkinliği güncelle
              </a>
            </div>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <div className="form-container">
            <p className="form-info">
              Bu sprintte form sadece görünüm; kayıt yapılmaz.
            </p>
            <form
              className="form"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="form-grup">
                <label htmlFor="title">Etkinlik Adı</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  maxLength={80}
                  placeholder="Örn. Kariyer Günleri 2026"
                />
              </div>
              <div className="form-grup">
                <label htmlFor="category">Kategori</label>
                <select id="category" name="category" defaultValue="">
                  <option value="">Seçiniz</option>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Söyleşi">Söyleşi</option>
                  <option value="Yarışma">Yarışma</option>
                </select>
              </div>
              <div className="form-grup">
                <label htmlFor="date">Tarih</label>
                <input type="date" id="date" name="date" />
              </div>
              <div className="form-grup">
                <label htmlFor="time">Saat</label>
                <input type="time" id="time" name="time" />
              </div>
              <div className="form-grup">
                <label htmlFor="location">Yer</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Örn. A Blok Konferans Salonu"
                />
              </div>
              <div className="form-grup">
                <label htmlFor="capacity">Kontenjan</label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                />
              </div>
              <div className="form-grup">
                <label htmlFor="description">Açıklama</label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Kaydet
              </button>
            </form>
          </div>
        )}
      </main>

      <footer>
        <p>Ömer Nacar · 2416501085 · 2026</p>
      </footer>
    </>
  );
}

export default App;
