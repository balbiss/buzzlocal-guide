import { Calendar, MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import eventoImg from "@/assets/vendedor-sonhos.jpeg";
import eventoVendedorSonhosImg from "@/assets/evento-vendedor-sonhos.jpg";

const WHATSAPP_URL = "https://wa.me/5511975858999?text=";

const events = [
  {
    id: 1,
    tag: "🔥 Destaque",
    category: "Peça Teatral",
    title: "O Vendedor de Sonhos",
    description:
      "Uma experiência teatral única que une entretenimento e reflexão, inspirando transformação pessoal e profissional.",
    image: eventoImg,
    dates: [
      { date: "13/03/2026", city: "Lorena/SP" },
      { date: "14/03/2026", city: "São José dos Campos/SP" },
      { date: "27/03/2026", city: "Ubatuba/SP" },
    ],
    whatsappMessage: "Olá! Quero participar do evento O Vendedor de Sonhos!",
  },
  {
    id: 2,
    tag: "Novo",
    category: "Palestra",
    title: "Vendedor de Sonhos — Workshop",
    description:
      "Workshop interativo com dinâmicas práticas para potencializar suas habilidades de liderança e comunicação.",
    image: eventoVendedorSonhosImg,
    dates: [
      { date: "05/04/2026", city: "São Paulo/SP" },
      { date: "12/04/2026", city: "Campinas/SP" },
    ],
    whatsappMessage: "Olá! Quero participar do Workshop Vendedor de Sonhos!",
  },
];

const EventsSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useState(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
  });

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
          className="max-w-5xl mx-auto relative"
        >
          <Carousel
            setApi={setApi}
            opts={{ loop: true, align: "center" }}
            className="w-full"
          >
            <CarouselContent>
              {events.map((event) => (
                <CarouselItem key={event.id}>
                  <div className="bg-card rounded-3xl overflow-hidden shadow-card border border-border hover:shadow-card-hover transition-all">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="gradient-primary text-primary-foreground border-0 font-bold text-xs px-3 py-1">
                            {event.tag}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                          {event.category}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4 leading-tight">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                          {event.description}
                        </p>

                        <div className="space-y-3 mb-6">
                          {event.dates.map((d) => (
                            <div
                              key={d.date + d.city}
                              className="flex items-center gap-4 bg-secondary rounded-xl px-4 py-3"
                            >
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar size={15} className="text-primary" />
                                <span className="font-bold text-foreground">
                                  {d.date}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin size={15} className="text-primary" />
                                <span className="text-muted-foreground">
                                  {d.city}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <Button
                          className="gradient-primary text-primary-foreground border-0 font-bold rounded-xl shadow-glow gap-2 w-full"
                          size="lg"
                          asChild
                        >
                          <a
                            href={
                              WHATSAPP_URL +
                              encodeURIComponent(event.whatsappMessage)
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Quero participar <ArrowRight size={16} />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation arrows */}
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

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {events.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === i
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30"
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
