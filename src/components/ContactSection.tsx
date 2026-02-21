import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório").max(100),
  phone: z.string().trim().min(1, "Telefone é obrigatório").max(20),
  email: z.string().trim().email("Email inválido").max(255),
  message: z.string().trim().min(1, "Mensagem é obrigatória").max(1000),
});

const ContactSection = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    toast({
      title: "Mensagem enviada!",
      description: "Sua mensagem foi enviada com sucesso! Retornaremos em breve.",
    });
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <section id="contato" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4 block">Contato</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">Fale Conosco</h2>
            <p className="text-muted-foreground">Envie sua mensagem e retornaremos o mais breve possível.</p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-2xl p-10 shadow-card border border-border text-center"
            >
              <CheckCircle2 size={48} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Mensagem enviada!</h3>
              <p className="text-muted-foreground text-sm">Sua mensagem foi enviada com sucesso! Retornaremos em breve.</p>
              <Button
                className="gradient-primary text-primary-foreground border-0 mt-6"
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", phone: "", email: "", message: "" });
                }}
              >
                Enviar outra mensagem
              </Button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border space-y-4"
            >
              <div>
                <Input
                  placeholder="Nome"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground rounded-xl h-12"
                />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <Input
                  placeholder="Telefone"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground rounded-xl h-12"
                />
                {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <Input
                  placeholder="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground rounded-xl h-12"
                />
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <Textarea
                  placeholder="Mensagem"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground rounded-xl min-h-[120px]"
                />
                {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
              </div>
              <Button
                type="submit"
                size="lg"
                className="gradient-primary text-primary-foreground border-0 font-bold rounded-xl w-full gap-2 shadow-glow"
              >
                <Send size={16} /> Enviar mensagem
              </Button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
