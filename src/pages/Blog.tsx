import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { BlogPost } from "@/types/blog";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      setPosts((data as BlogPost[]) || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold text-foreground mb-4"
        >
          Blog
        </motion.h1>
        <p className="text-muted-foreground text-lg mb-12 max-w-xl">
          Artigos, dicas e insights sobre desenvolvimento pessoal e profissional.
        </p>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-muted-foreground text-center py-20">
            Nenhum artigo publicado ainda.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block bg-card border border-border rounded-xl overflow-hidden hover:shadow-card-hover transition-all duration-300"
                >
                  {post.cover_image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar size={14} />
                      {new Date(post.created_at).toLocaleDateString("pt-BR")}
                    </div>
                    <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
