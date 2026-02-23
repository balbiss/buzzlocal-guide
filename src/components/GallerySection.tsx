import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import alfredoRocha2017 from "@/assets/alfredo-rocha-2017.avif";
import odontologiaUnivap2018 from "@/assets/odontologia-univap-2018.avif";
import mestreMachida2019 from "@/assets/mestre-machida-2019.avif";

const galleryItems = [
  {
    title: "Lyoto Machida e Vinicio",
    year: "2019",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
  },
  {
    title: "Mestre Machida Campinas",
    year: "2019",
    image: mestreMachida2019,
  },
  {
    title: "Odontologia Univap",
    year: "2018",
    image: odontologiaUnivap2018,
  },
  {
    title: "Mestre Machida SJC",
    year: "2018",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop",
  },
  {
    title: "Alfredo Rocha Teatro Colinas",
    year: "2017",
    image: alfredoRocha2017,
  },
  {
    title: "Workshop Empresarial",
    year: "2018",
    image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=600&h=400&fit=crop",
  },
];

const GallerySection = () => {
  const [selected, setSelected] = useState<typeof galleryItems[0] | null>(null);

  return (
    <section id="galeria" className="py-20 bg-surface-elevated">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4 block">Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">Eventos Realizados</h2>
          <p className="text-muted-foreground">Uma amostra dos eventos que já transformaram vidas.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {galleryItems.map((item, i) => (
            <motion.button
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              onClick={() => setSelected(item)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card border border-border"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="font-bold text-foreground text-sm">{item.title}</h3>
                <p className="text-xs text-primary">{item.year}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button className="absolute top-4 right-4 text-foreground hover:text-primary" onClick={() => setSelected(null)}>
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selected.image} alt={selected.title} className="w-full rounded-2xl shadow-card" />
              <div className="mt-4 text-center">
                <h3 className="font-bold text-foreground text-lg">{selected.title}</h3>
                <p className="text-primary text-sm">{selected.year}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
