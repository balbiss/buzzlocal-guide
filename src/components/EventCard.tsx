import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import type { Event } from "@/data/events";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Link
      to={`/evento/${event.id}`}
      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all border border-border hover:border-primary/20"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {event.isFree ? (
            <Badge className="bg-badge-free text-badge-free-foreground border-0 font-semibold text-xs">Gratuito</Badge>
          ) : (
            <Badge className="bg-badge-paid text-badge-paid-foreground border-0 font-semibold text-xs">Pago</Badge>
          )}
          {event.isHot && (
            <Badge className="bg-badge-hot text-badge-hot-foreground border-0 font-semibold text-xs">🔥 Em alta</Badge>
          )}
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs font-semibold text-primary mb-1">{event.category}</p>
        <h3 className="font-bold text-foreground text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {event.title}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
          <Calendar size={13} />
          <span>{event.date} · {event.time}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin size={13} />
          <span>{event.city}</span>
        </div>
        <div className="mt-3 flex items-center text-xs font-semibold text-primary gap-1 group-hover:gap-2 transition-all">
          Ver evento <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
