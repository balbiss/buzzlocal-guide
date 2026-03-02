import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { BlogPost, BlogPostInsert } from "@/types/blog";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, LogOut, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo-jr.png";
import { Link } from "react-router-dom";

const Admin = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState<BlogPostInsert>({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    cover_image_url: "",
    published: false,
  });

  useEffect(() => {
    checkAuth();
    fetchPosts();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/admin/login");
      return;
    }
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin");

    if (!roles || roles.length === 0) {
      navigate("/admin/login");
    }
  };

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts((data as BlogPost[]) || []);
    setLoading(false);
  };

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleTitleChange = (title: string) => {
    setForm((f) => ({ ...f, title, slug: generateSlug(title) }));
  };

  const resetForm = () => {
    setForm({ title: "", slug: "", content: "", excerpt: "", cover_image_url: "", published: false });
    setEditing(null);
    setCreating(false);
  };

  const handleEdit = (post: BlogPost) => {
    setEditing(post);
    setCreating(false);
    setForm({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || "",
      cover_image_url: post.cover_image_url || "",
      published: post.published,
    });
  };

  const handleSave = async () => {
    if (!form.title || !form.content) {
      toast.error("Título e conteúdo são obrigatórios");
      return;
    }
    setSaving(true);

    if (editing) {
      const { error } = await supabase
        .from("blog_posts")
        .update(form)
        .eq("id", editing.id);
      if (error) {
        toast.error("Erro ao atualizar: " + error.message);
      } else {
        toast.success("Post atualizado!");
        resetForm();
        fetchPosts();
      }
    } else {
      const { error } = await supabase.from("blog_posts").insert(form);
      if (error) {
        toast.error("Erro ao criar: " + error.message);
      } else {
        toast.success("Post criado!");
        resetForm();
        fetchPosts();
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este post?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      toast.error("Erro ao excluir");
    } else {
      toast.success("Post excluído");
      fetchPosts();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const showForm = creating || editing;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link to="/">
              <img src={logo} alt="JR" className="h-8" />
            </Link>
            <span className="text-sm font-bold text-foreground">Painel Admin</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-muted-foreground">
            <LogOut size={16} /> Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {!showForm ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-foreground">Posts do Blog</h1>
              <Button
                onClick={() => { resetForm(); setCreating(true); }}
                className="gradient-primary text-primary-foreground font-bold gap-2"
              >
                <Plus size={18} /> Novo Post
              </Button>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-card rounded-lg animate-pulse" />
                ))}
              </div>
            ) : posts.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">Nenhum post criado.</p>
            ) : (
              <div className="space-y-3">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-card border border-border rounded-lg p-4 flex items-center justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{post.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {post.published ? "✅ Publicado" : "📝 Rascunho"} · {new Date(post.created_at).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(post)}>
                        <Edit2 size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(post.id)} className="text-destructive">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <Button variant="ghost" size="sm" onClick={resetForm} className="gap-2 mb-6 text-muted-foreground">
              <ArrowLeft size={16} /> Voltar
            </Button>

            <h2 className="text-2xl font-bold text-foreground mb-6">
              {editing ? "Editar Post" : "Novo Post"}
            </h2>

            <div className="space-y-5">
              <div>
                <Label>Título</Label>
                <Input
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Título do artigo"
                  className="bg-card border-border"
                />
              </div>

              <div>
                <Label>Slug</Label>
                <Input
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  placeholder="url-do-artigo"
                  className="bg-card border-border"
                />
              </div>

              <div>
                <Label>Resumo</Label>
                <Input
                  value={form.excerpt || ""}
                  onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                  placeholder="Breve descrição do artigo"
                  className="bg-card border-border"
                />
              </div>

              <div>
                <Label>URL da imagem de capa</Label>
                <Input
                  value={form.cover_image_url || ""}
                  onChange={(e) => setForm((f) => ({ ...f, cover_image_url: e.target.value }))}
                  placeholder="https://..."
                  className="bg-card border-border"
                />
              </div>

              <div>
                <Label>Conteúdo</Label>
                <Textarea
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  placeholder="Escreva o conteúdo do artigo..."
                  className="bg-card border-border min-h-[300px]"
                />
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  checked={form.published}
                  onCheckedChange={(checked) => setForm((f) => ({ ...f, published: checked }))}
                />
                <Label>Publicado</Label>
              </div>

              <Button
                onClick={handleSave}
                disabled={saving}
                className="gradient-primary text-primary-foreground font-bold w-full"
              >
                {saving ? "Salvando..." : editing ? "Atualizar Post" : "Criar Post"}
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Admin;
