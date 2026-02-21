import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const benefits = [
  "Cadastro rápido e gratuito",
  "Mais visibilidade para seu evento",
  "Tráfego qualificado de interessados",
  "Página profissional do evento",
  "Destaque na plataforma",
];

const ForOrganizers = () => {
  return (
    <section id="organizadores" className="relative overflow-hidden py-20">
      <div className="absolute inset-0 gradient-primary opacity-95" />
      <div className="relative container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
              Divulgue seu evento para milhares de pessoas
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Aumente sua audiência com a principal plataforma de descoberta de eventos da região.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-3 mb-10 items-start mx-auto w-fit"
          >
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0">
                  <Check size={14} className="text-primary-foreground" />
                </div>
                <span className="text-primary-foreground font-medium text-sm">{b}</span>
              </div>
            ))}
          </motion.div>

          <Button
            size="lg"
            className="gradient-accent text-accent-foreground border-0 font-bold rounded-xl px-8 shadow-hero text-base gap-2"
          >
            Cadastrar meu evento <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ForOrganizers;
