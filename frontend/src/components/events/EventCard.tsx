import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="kart">
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
          onShowDetail(event.id);
        }}
      >
        Detayları gör
      </a>
    </article>
  );
}

export default EventCard;
