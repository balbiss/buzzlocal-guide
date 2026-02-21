import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-jr.jpg";
import { motion } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/5511975858999?text=" + encodeURIComponent("Olá! Gostaria de saber mais sobre os eventos da JR Inovações.");

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Evento JR Inovações" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      <div className="relative container mx-auto px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              Fortalecendo o futuro através de ensinamentos reais
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] mb-6">
            Desenvolva-se.{" "}
            <span className="text-gradient">Cresça.</span>{" "}
            Alcance o sucesso.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
            Eventos e palestras que transformam conhecimento em resultados reais.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="gradient-primary text-primary-foreground border-0 font-bold rounded-xl px-8 shadow-glow text-base gap-2" asChild>
              <a href="#eventos">
                Ver eventos <ArrowRight size={18} />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary font-bold rounded-xl px-8 text-base gap-2" asChild>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} /> Falar no WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
