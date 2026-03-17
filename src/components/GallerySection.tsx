import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type GalleryItem = {
  title: string;
  year: string;
  images: string[];
};

const GallerySection = () => {
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [allItems, setAllItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data: events } = await supabase
        .from("gallery_events")
        .select("*")
        .order("sort_order", { ascending: true });

      if (!events || events.length === 0) {
        setLoading(false);
        return;
      }

      const items: GalleryItem[] = [];
      for (const event of events) {
        const { data: photos } = await supabase
          .from("gallery_photos")
          .select("*")
          .eq("event_id", event.id)
          .order("sort_order", { ascending: true });

        if (photos && photos.length > 0) {
          items.push({
            title: event.title,
            year: event.year,
            images: photos.map((p) => p.image_url),
          });
        }
      }
      setAllItems(items);
      setLoading(false);
    };
    fetchEvents();
  }, []);

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

  if (!loading && allItems.length === 0) return null;

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
          {allItems.map((item, i) => (
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
            className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-2 sm:p-4"
            onClick={closeLightbox}
          >
            <button className="absolute top-3 right-3 sm:top-4 sm:right-4 text-foreground hover:text-primary z-10" onClick={closeLightbox}>
              <X size={24} />
            </button>

            {selected.images.length > 1 && (
              <>
                <button
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-card/80 backdrop-blur border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-card/80 backdrop-blur border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                >
                  <ChevronRight size={18} />
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
