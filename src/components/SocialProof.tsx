import { motion } from "framer-motion";
import { Star } from "lucide-react";

const stats = [
  { value: "2.500+", label: "Eventos publicados" },
  { value: "180K+", label: "Visitantes mensais" },
  { value: "850+", label: "Organizadores ativos" },
];

const testimonials = [
  {
    name: "Ana Souza",
    role: "Produtora de Eventos",
    text: "A Eventora triplicou o tráfego para nossos eventos. A plataforma é incrível e super fácil de usar!",
  },
  {
    name: "Carlos Lima",
    role: "Organizador de Workshops",
    text: "Desde que comecei a divulgar na Eventora, meus workshops estão sempre lotados. Recomendo demais!",
  },
  {
    name: "Mariana Costa",
    role: "Gestora Cultural",
    text: "A melhor plataforma para quem precisa de visibilidade. O suporte também é excelente.",
  },
];

const SocialProof = () => {
  return (
    <section className="bg-secondary py-16">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-16 max-w-2xl mx-auto">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl md:text-4xl font-extrabold text-gradient-primary">{s.value}</div>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-8">
          O que dizem os organizadores
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-card border border-border"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-foreground mb-4 leading-relaxed">"{t.text}"</p>
              <div>
                <p className="font-bold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
