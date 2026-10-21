import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article className="detay detay-karti">
      <div className="detay-grid">
        {event.image && (
          <div className="afis-sutun">
            <figure className="afis-cerceve">
              <img src={event.image} alt={`${event.title} afişi`} />
              <figcaption>{event.title} afişi</figcaption>
            </figure>
          </div>
        )}
        <div className="kunye-sutun">
          <h2>Etkinlik Künyesi</h2>
          <dl className="kunye-listesi">
            <dt>Tarih</dt>
            <dd>
              <time dateTime={`${event.date}T${event.time}`}>
                {formatDate(event.date)}, {event.time}
              </time>
            </dd>
            <dt>Yer</dt>
            <dd>{event.location}</dd>
            <dt>Kategori</dt>
            <dd>{event.category}</dd>
            <dt>Kontenjan</dt>
            <dd>{event.capacity} kişi</dd>
          </dl>
        </div>
      </div>
      <section className="aciklama-alani">
        <h2>Açıklama</h2>
        <p>{event.description}</p>
      </section>
      <div className="detay-eylemler">
        <a
          href="#events"
          className="btn btn-secondary"
          onClick={(e) => {
            e.preventDefault();
            onBack();
          }}
        >
          ← Listeye dön
        </a>
        <a
          href="#update"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            onEdit(event.id);
          }}
        >
          Bu etkinliği güncelle
        </a>
      </div>
    </article>
  );
}

export default EventDetail;
