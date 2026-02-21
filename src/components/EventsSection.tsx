import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import eventoImg from "@/assets/evento-vendedor-sonhos.jpg";

const WHATSAPP_URL = "https://wa.me/5511975858999?text=";

const eventDates = [
  { date: "13/03/2026", city: "Lorena/SP" },
  { date: "14/03/2026", city: "São José dos Campos/SP" },
  { date: "27/03/2026", city: "Ubatuba/SP" },
];

const EventsSection = () => {
  return (
    <section id="eventos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4 block">Próximos Eventos</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">Nossos Eventos</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Confira os próximos eventos e garanta sua participação.</p>
        </div>

        {/* Featured event */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-3xl overflow-hidden shadow-card border border-border hover:shadow-card-hover transition-all">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                <img
                  src={eventoImg}
                  alt="O Vendedor de Sonhos"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="gradient-primary text-primary-foreground border-0 font-bold text-xs px-3 py-1">
                    🔥 Destaque
                  </Badge>
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-center">
                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Peça Teatral</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4 leading-tight">
                  O Vendedor de Sonhos
                </h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  Uma experiência teatral única que une entretenimento e reflexão, inspirando transformação pessoal e profissional.
                </p>

                <div className="space-y-3 mb-6">
                  {eventDates.map((d) => (
                    <div key={d.date + d.city} className="flex items-center gap-4 bg-secondary rounded-xl px-4 py-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar size={15} className="text-primary" />
                        <span className="font-bold text-foreground">{d.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin size={15} className="text-primary" />
                        <span className="text-muted-foreground">{d.city}</span>
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
                    href={WHATSAPP_URL + encodeURIComponent("Olá! Quero participar do evento O Vendedor de Sonhos!")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Quero participar <ArrowRight size={16} />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;
