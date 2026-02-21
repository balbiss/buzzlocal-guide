import { blogPosts } from "@/data/events";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const BlogPreview = () => {
  return (
    <section id="blog" className="container mx-auto px-4 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">Blog</h2>
          <p className="text-muted-foreground">Dicas, guias e agenda de eventos.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {blogPosts.map((post, i) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all border border-border cursor-pointer"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <span className="text-xs font-semibold text-primary">{post.category}</span>
              <h3 className="font-bold text-foreground text-sm mt-1 mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">{post.excerpt}</p>
              <div className="flex items-center text-xs font-semibold text-primary gap-1 group-hover:gap-2 transition-all">
                Ler mais <ArrowRight size={14} />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default BlogPreview;
