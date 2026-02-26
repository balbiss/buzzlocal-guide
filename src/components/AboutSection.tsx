import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const differentials = [
  "Eventos práticos e objetivos",
  "Conteúdo aplicável no mundo real",
  "Palestrantes reconhecidos",
  "Experiência transformadora",
];

const AboutSection = () => {
  return (
    <section id="sobre" className="py-20 bg-surface-elevated">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4 block">Sobre Nós</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6 leading-tight">
              Transformando <span className="text-gradient">conhecimento</span> em resultados
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A missão da JR INOVAÇÕES é realizar eventos de qualidade e criar um ambiente favorável à aprendizagem.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Trabalhamos para capacitar nossos participantes com ferramentas práticas e conhecimento aplicado, ajudando cada pessoa a sair na frente em um mercado cheio de mudanças.
            </p>

            <div className="flex flex-col gap-3">
              {differentials.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 size={20} className="text-primary shrink-0" />
                  <span className="text-foreground font-medium text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
