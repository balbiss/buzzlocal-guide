import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-events.jpg";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Festival de eventos" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/70 to-foreground/40" />
      </div>

      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-4">
            Descubra os melhores eventos da sua cidade
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
            Shows, feiras, cursos, workshops e muito mais em um só lugar.
          </p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-card rounded-2xl p-2 shadow-hero flex flex-col sm:flex-row gap-2"
          >
            <div className="flex items-center gap-2 flex-1 px-3 py-2 bg-secondary rounded-xl">
              <Search size={18} className="text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Buscar eventos..."
                className="bg-transparent outline-none text-sm w-full text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex items-center gap-2 flex-1 px-3 py-2 bg-secondary rounded-xl">
              <MapPin size={18} className="text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Cidade"
                className="bg-transparent outline-none text-sm w-full text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button className="gradient-primary text-primary-foreground border-0 rounded-xl px-6 h-11 font-semibold shadow-hero shrink-0">
              Buscar eventos
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
