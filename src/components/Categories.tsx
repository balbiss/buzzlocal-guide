import { categories } from "@/data/events";
import { motion } from "framer-motion";

const Categories = () => {
  return (
    <section id="categorias" className="container mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">Categorias de Eventos</h2>
      <p className="text-muted-foreground mb-8">Explore eventos por categoria e encontre o que combina com você.</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <motion.button
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group bg-card rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all text-left border border-border hover:border-primary/30"
          >
            <span className="text-3xl mb-3 block">{cat.icon}</span>
            <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{cat.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{cat.count} eventos</p>
          </motion.button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
