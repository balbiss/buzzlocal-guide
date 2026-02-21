import { events } from "@/data/events";
import EventCard from "./EventCard";
import { motion } from "framer-motion";

const FeaturedEvents = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">Eventos em Destaque</h2>
          <p className="text-muted-foreground">Os eventos mais procurados da semana.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {events.slice(0, 8).map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <EventCard event={event} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedEvents;
