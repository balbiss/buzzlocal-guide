import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import alfredoRocha2017 from "@/assets/alfredo-rocha-2017.avif";
import odontologiaUnivap2018 from "@/assets/odontologia-univap-2018.avif";
import lyotoMachida2019 from "@/assets/lyoto-machida-2019.png";
import lyotoMachidaCampinas2019 from "@/assets/lyoto-machida-campinas-2019.png";
import univap8390 from "@/assets/univap-8390-1.avif";
import univap8391 from "@/assets/univap-8391.avif";
import univap8391b from "@/assets/univap-8391-1.avif";
import univap8392 from "@/assets/univap-8392.avif";
import univap8392b from "@/assets/univap-8392-1.avif";
import univap8393 from "@/assets/univap-8393.avif";
import univap8393b from "@/assets/univap-8393-1.avif";
import univap8394 from "@/assets/univap-8394.avif";
import univap8394b from "@/assets/univap-8394-1.avif";
import univap8395 from "@/assets/univap-8395.avif";
import alfredo8401 from "@/assets/alfredo-8401.avif";
import alfredo8402 from "@/assets/alfredo-8402.avif";
import alfredo8403 from "@/assets/alfredo-8403.avif";
import alfredo8404 from "@/assets/alfredo-8404.avif";
import alfredo8405 from "@/assets/alfredo-8405.avif";
import alfredo8406 from "@/assets/alfredo-8406.avif";
import alfredo8407 from "@/assets/alfredo-8407.avif";
import alfredo8408 from "@/assets/alfredo-8408.avif";
import alfredo8409 from "@/assets/alfredo-8409.avif";
import alfredo8410 from "@/assets/alfredo-8410.avif";
import alfredo8411 from "@/assets/alfredo-8411.avif";
import alfredo8412 from "@/assets/alfredo-8412.avif";
import alfredo8413 from "@/assets/alfredo-8413.avif";
import alfredo8415 from "@/assets/alfredo-8415.avif";
import alfredo8416 from "@/assets/alfredo-8416.avif";
import alfredo8417 from "@/assets/alfredo-8417.avif";
import alfredo8419 from "@/assets/alfredo-8419.avif";
import alfredo8420 from "@/assets/alfredo-8420.avif";
import alfredo8424 from "@/assets/alfredo-8424.avif";
import alfredo8425 from "@/assets/alfredo-8425.avif";
import machida8344 from "@/assets/machida-8344.avif";
import machida8345 from "@/assets/machida-8345.avif";
import machida8346 from "@/assets/machida-8346.avif";
import machida8347 from "@/assets/machida-8347.avif";
import machida8348 from "@/assets/machida-8348.avif";
import machida8349 from "@/assets/machida-8349.avif";
import machida8350 from "@/assets/machida-8350.avif";
import machida8351 from "@/assets/machida-8351.avif";
import machida8352 from "@/assets/machida-8352.avif";
import machida8353 from "@/assets/machida-8353.avif";
import mestreMachida2019 from "@/assets/mestre-machida-2019.avif";

type GalleryItem = {
  title: string;
  year: string;
  images: string[];
};

const galleryItems: GalleryItem[] = [
  {
    title: "Lyoto Machida e Vinicio — Jacareí",
    year: "2019",
    images: [lyotoMachida2019],
  },
  {
    title: "Lyoto Machida e Vinicio — Campinas",
    year: "2019",
    images: [lyotoMachidaCampinas2019],
  },
  {
    title: "Mestre Machida Campinas",
    year: "2019",
    images: [
      mestreMachida2019,
      machida8344,
      machida8345,
      machida8346,
      machida8347,
      machida8348,
      machida8349,
      machida8350,
      machida8351,
      machida8352,
      machida8353,
    ],
  },
  {
    title: "Odontologia Univap",
    year: "2018",
    images: [
      odontologiaUnivap2018,
      univap8390,
      univap8391,
      univap8391b,
      univap8392,
      univap8392b,
      univap8393,
      univap8393b,
      univap8394,
      univap8394b,
      univap8395,
    ],
  },
  {
    title: "Alfredo Rocha Teatro Colinas",
    year: "2017",
    images: [
      alfredoRocha2017,
      alfredo8401,
      alfredo8402,
      alfredo8403,
      alfredo8404,
      alfredo8405,
      alfredo8406,
      alfredo8407,
      alfredo8408,
      alfredo8409,
      alfredo8410,
      alfredo8411,
      alfredo8412,
      alfredo8413,
      alfredo8415,
      alfredo8416,
      alfredo8417,
      alfredo8419,
      alfredo8420,
      alfredo8424,
      alfredo8425,
    ],
  },
];

const GallerySection = () => {
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openLightbox = (item: GalleryItem, index = 0) => {
    setSelected(item);
    setPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelected(null);
    setPhotoIndex(0);
  };

  const prevPhoto = () => {
    if (!selected) return;
    setPhotoIndex((prev) => (prev - 1 + selected.images.length) % selected.images.length);
  };

  const nextPhoto = () => {
    if (!selected) return;
    setPhotoIndex((prev) => (prev + 1) % selected.images.length);
  };

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
              onClick={() => openLightbox(item)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card border border-border"
            >
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="font-bold text-foreground text-sm">{item.title}</h3>
                <p className="text-xs text-primary">
                  {item.year} {item.images.length > 1 && `• ${item.images.length} fotos`}
                </p>
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
            onClick={closeLightbox}
          >
            <button className="absolute top-4 right-4 text-foreground hover:text-primary z-10" onClick={closeLightbox}>
              <X size={28} />
            </button>

            {selected.images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-card/80 backdrop-blur border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-card/80 backdrop-blur border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            <motion.div
              key={photoIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selected.images[photoIndex]} alt={selected.title} className="w-full rounded-2xl shadow-card" />
              <div className="mt-4 text-center">
                <h3 className="font-bold text-foreground text-lg">{selected.title}</h3>
                <p className="text-primary text-sm">
                  {selected.year}
                  {selected.images.length > 1 && ` • ${photoIndex + 1}/${selected.images.length}`}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
