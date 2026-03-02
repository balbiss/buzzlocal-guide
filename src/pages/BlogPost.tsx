import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { BlogPost as BlogPostType } from "@/types/blog";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      setPost(data as BlogPostType | null);
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-24">
          <div className="max-w-3xl mx-auto">
            <div className="h-8 w-48 bg-card animate-pulse rounded mb-4" />
            <div className="h-64 bg-card animate-pulse rounded-xl mb-6" />
            <div className="space-y-3">
              <div className="h-4 bg-card animate-pulse rounded w-full" />
              <div className="h-4 bg-card animate-pulse rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-24 text-center py-20">
          <h1 className="text-2xl font-bold text-foreground mb-4">Artigo não encontrado</h1>
          <Link to="/blog" className="text-primary hover:underline">
            ← Voltar ao blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Voltar ao blog
          </Link>

          {post.cover_image_url && (
            <div className="aspect-video rounded-xl overflow-hidden mb-8">
              <img
                src={post.cover_image_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Calendar size={16} />
            {new Date(post.created_at).toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8">
            {post.title}
          </h1>

          <div className="prose prose-invert max-w-none text-foreground/90 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
