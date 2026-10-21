import { useEffect, useState } from "react";
import "./App.css";
import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

const categories = [...new Set(events.map((e) => e.category))];

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

  return (
    <>
      <Header title={headerTitle} text={subtitle ?? undefined} />
      <Navigation current={page} onNavigate={go} />

      <main>
        {page === "home" && (
          <section>
            <h2 className="section-title">Yaklaşan 2 Etkinlik</h2>
            <EventList
              events={upcoming}
              onShowDetail={(id) => go("detail", id)}
            />
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
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            {filtered.length > 0 && (
              <p id="sonuc">{filtered.length} etkinlik listeleniyor.</p>
            )}
            <EventList
              events={filtered}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
            />
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
          <EventDetail
            event={selected}
            onBack={() => go("events")}
            onEdit={(id) => go("update", id)}
          />
        )}

        {(page === "add" || page === "update") && (
          <EventForm onSubmit={() => window.scrollTo(0, 0)} />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
