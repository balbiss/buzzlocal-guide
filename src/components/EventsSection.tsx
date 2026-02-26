import { Calendar, MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import eventoImg from "@/assets/vendedor-sonhos.jpeg";

const WHATSAPP_URL = "https://wa.me/5511975858999?text=";

const events = [
  {
    id: 1,
    title: "O Vendedor de Sonhos",
    date: "13/03/2026",
    city: "Lorena/SP",
    image: eventoImg,
    whatsappMessage: "Olá! Quero participar do evento O Vendedor de Sonhos em Lorena!",
  },
  {
    id: 2,
    title: "O Vendedor de Sonhos",
    date: "14/03/2026",
    city: "São José dos Campos/SP",
    image: eventoImg,
    whatsappMessage: "Olá! Quero participar do evento O Vendedor de Sonhos em São José dos Campos!",
  },
  {
    id: 3,
    title: "O Vendedor de Sonhos",
    date: "27/03/2026",
    city: "Ubatuba/SP",
    image: eventoImg,
    whatsappMessage: "Olá! Quero participar do evento O Vendedor de Sonhos em Ubatuba!",
  },
];

const EventsSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section id="eventos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4 block">
            Próximos Eventos
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Nossos Eventos
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Confira os próximos eventos e garanta sua participação.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative"
        >
          <Carousel
            setApi={setApi}
            opts={{ loop: true, align: "center" }}
            className="w-full"
          >
            <CarouselContent>
              {events.map((event) => (
                <CarouselItem key={event.id}>
                  <a
                    href={WHATSAPP_URL + encodeURIComponent(event.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-card border border-border hover:shadow-card-hover transition-all">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />

                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                          <h3 className="text-xl md:text-2xl font-extrabold text-foreground mb-2">
                            {event.title}
                          </h3>
                          <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar size={15} className="text-primary" />
                              <span className="font-bold text-foreground">{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin size={15} className="text-primary" />
                              <span className="text-foreground/80">{event.city}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className="gradient-primary text-primary-foreground border-0 font-bold text-xs px-4 py-2 gap-1 shrink-0">
                          Quero participar <ArrowRight size={14} />
                        </Badge>
                      </div>
                    </div>
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>

            <Button
              variant="outline"
              size="icon"
              className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-card/80 backdrop-blur border-border hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => api?.scrollPrev()}
            >
              <ChevronLeft size={20} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-card/80 backdrop-blur border-border hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => api?.scrollNext()}
            >
              <ChevronRight size={20} />
            </Button>
          </Carousel>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {events.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === i ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;
