import { useParams, Link } from "react-router-dom";
import { events } from "@/data/events";
import { Calendar, MapPin, ArrowLeft, ExternalLink, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const EventDetail = () => {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-extrabold text-foreground mb-2">Evento não encontrado</h1>
            <p className="text-muted-foreground mb-6">O evento que você procura não existe ou foi removido.</p>
            <Button asChild className="gradient-primary text-primary-foreground border-0">
              <Link to="/">Voltar para eventos</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero image */}
        <div className="relative h-64 md:h-96 overflow-hidden">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground text-sm mb-3 transition-colors"
            >
              <ArrowLeft size={16} /> Voltar
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-8 relative z-10 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl shadow-card border border-border p-6 md:p-8 max-w-3xl"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-primary/10 text-primary border-0 font-semibold text-xs">{event.category}</Badge>
              {event.isFree ? (
                <Badge className="bg-badge-free text-badge-free-foreground border-0 font-semibold text-xs">Gratuito</Badge>
              ) : (
                <Badge className="bg-badge-paid text-badge-paid-foreground border-0 font-semibold text-xs">Pago</Badge>
              )}
              {event.isHot && (
                <Badge className="bg-badge-hot text-badge-hot-foreground border-0 font-semibold text-xs">🔥 Em alta</Badge>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4">{event.title}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar size={16} className="text-primary" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock size={16} className="text-primary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={16} className="text-primary" />
                <span>{event.location}, {event.city}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User size={16} className="text-primary" />
                <span>{event.organizerName}</span>
              </div>
            </div>

            <div className="border-t border-border pt-6 mb-6">
              <h2 className="font-bold text-foreground mb-3">Sobre o evento</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
            </div>

            <Button
              size="lg"
              className="gradient-primary text-primary-foreground border-0 font-bold rounded-xl w-full sm:w-auto px-8 gap-2 shadow-hero"
              asChild
            >
              <a href={event.organizerUrl} target="_blank" rel="noopener noreferrer">
                Ir para site do organizador <ExternalLink size={16} />
              </a>
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EventDetail;
