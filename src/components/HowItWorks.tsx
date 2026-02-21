import { ClipboardList, Megaphone, Users } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: ClipboardList,
    title: "Cadastre seu evento",
    description: "Preencha as informações do seu evento em poucos minutos.",
  },
  {
    icon: Megaphone,
    title: "Nós divulgamos",
    description: "Seu evento aparece para milhares de pessoas que buscam o que fazer.",
  },
  {
    icon: Users,
    title: "Você recebe o público",
    description: "Os interessados são direcionados diretamente para você.",
  },
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">Como Funciona</h2>
        <p className="text-muted-foreground">Simples, rápido e eficiente.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-hero">
              <step.icon size={28} className="text-primary-foreground" />
            </div>
            <div className="text-xs font-bold text-primary mb-2">Passo {i + 1}</div>
            <h3 className="font-bold text-foreground text-lg mb-1">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
