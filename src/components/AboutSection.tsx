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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
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

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl gradient-primary p-[2px]">
              <div className="w-full h-full rounded-3xl bg-card flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow">
                    <span className="text-3xl font-extrabold text-primary-foreground">JR</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-foreground mb-2">JR INOVAÇÕES</h3>
                  <p className="text-sm text-muted-foreground">Desenvolvimento de Pessoas<br />& Consultoria Empresarial</p>
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-secondary rounded-xl p-4">
                      <div className="text-2xl font-extrabold text-gradient">50+</div>
                      <p className="text-xs text-muted-foreground mt-1">Eventos realizados</p>
                    </div>
                    <div className="bg-secondary rounded-xl p-4">
                      <div className="text-2xl font-extrabold text-gradient">5K+</div>
                      <p className="text-xs text-muted-foreground mt-1">Participantes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
