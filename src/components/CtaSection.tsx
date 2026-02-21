import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/5511975858999?text=" + encodeURIComponent("Olá! Quero saber mais sobre os próximos eventos.");

const CtaSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 gradient-primary opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,transparent_50%,hsl(var(--background))_100%)]" />

      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
            Quer participar dos próximos eventos?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-lg mx-auto">
            Entre em contato e não perca as oportunidades de desenvolvimento que podem mudar sua carreira.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold rounded-xl px-8 text-base gap-2"
              asChild
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} /> Falar no WhatsApp
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-bold rounded-xl px-8 text-base gap-2"
              asChild
            >
              <a href="#contato">
                Receber novidades <ArrowRight size={18} />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
