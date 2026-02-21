import { useState } from "react";
import { motion } from "framer-motion";

const filters = [
  "Hoje",
  "Este fim de semana",
  "Gratuitos",
  "Online",
  "Presenciais",
  "Shows",
  "Cursos",
  "Negócios",
];

const QuickFilters = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="container mx-auto px-4 -mt-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
      >
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(active === f ? null : f)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              active === f
                ? "gradient-primary text-primary-foreground shadow-hero"
                : "bg-card text-foreground shadow-card hover:shadow-card-hover border border-border"
            }`}
          >
            {f}
          </button>
        ))}
      </motion.div>
    </section>
  );
};

export default QuickFilters;
