import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, ArrowLeft, Upload, GripVertical } from "lucide-react";
import { useDragReorder } from "@/hooks/use-drag-reorder";

type UpcomingEvent = {
  id: string;
  title: string;
  event_date: string;
  city: string;
  image_url: string;
  ticket_url: string;
  sort_order: number;
  published: boolean;
  created_at: string;
};

type FormState = {
  title: string;
  event_date: string;
  city: string;
  image_url: string;
  ticket_url: string;
  published: boolean;
};

const emptyForm: FormState = {
  title: "",
  event_date: "",
  city: "",
  image_url: "",
  ticket_url: "",
  published: true,
};

const AdminUpcomingEvents = () => {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<UpcomingEvent | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);

  const fetchEvents = useCallback(async () => {
    const { data } = await supabase
      .from("upcoming_events")
      .select("*")
      .order("sort_order", { ascending: true });
    setEvents((data as UpcomingEvent[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
    setCreating(false);
  };

  const handleEdit = (event: UpcomingEvent) => {
    setEditing(event);
    setCreating(false);
    setForm({
      title: event.title,
      event_date: event.event_date,
      city: event.city,
      image_url: event.image_url,
      ticket_url: event.ticket_url,
      published: event.published,
    });
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploading(true);
    const file = e.target.files[0];
    const ext = file.name.split(".").pop();
    const fileName = `upcoming/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage.from("event-photos").upload(fileName, file);
    if (error) {
      toast.error("Erro ao enviar imagem: " + error.message);
    } else {
      const { data: urlData } = supabase.storage.from("event-photos").getPublicUrl(fileName);
      setForm((f) => ({ ...f, image_url: urlData.publicUrl }));
      toast.success("Imagem enviada!");
    }
    setUploading(false);
    e.target.value = "";
  };

  const handleSave = async () => {
    if (!form.title || !form.event_date || !form.city) {
      toast.error("Título, data e cidade são obrigatórios");
      return;
    }
    setSaving(true);

    if (editing) {
      const { error } = await supabase
        .from("upcoming_events")
        .update(form)
        .eq("id", editing.id);
      if (error) {
        toast.error("Erro ao atualizar: " + error.message);
      } else {
        toast.success("Evento atualizado!");
        resetForm();
        fetchEvents();
      }
    } else {
      const { error } = await supabase.from("upcoming_events").insert({
        ...form,
        sort_order: events.length,
      });
      if (error) {
        toast.error("Erro ao criar: " + error.message);
      } else {
        toast.success("Evento criado!");
        resetForm();
        fetchEvents();
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este evento?")) return;
    const { error } = await supabase.from("upcoming_events").delete().eq("id", id);
    if (error) {
      toast.error("Erro ao excluir");
    } else {
      toast.success("Evento excluído");
      fetchEvents();
    }
  };

  const handleReorderEvents = useCallback(async (reordered: UpcomingEvent[]) => {
    setEvents(reordered);
    const updates = reordered.map((ev, i) =>
      supabase.from("upcoming_events").update({ sort_order: i }).eq("id", ev.id)
    );
    await Promise.all(updates);
    toast.success("Ordem atualizada!");
  }, []);

  const { dragIndex, overIndex, handleDragStart, handleDragOver, handleDrop, handleDragEnd } =
    useDragReorder(events, handleReorderEvents);

  const showForm = creating || editing;

  if (showForm) {
    return (
      <div>
        <Button variant="ghost" size="sm" onClick={resetForm} className="gap-2 mb-6 text-muted-foreground">
          <ArrowLeft size={16} /> Voltar
        </Button>

        <h2 className="text-2xl font-bold text-foreground mb-6">
          {editing ? "Editar Evento" : "Novo Evento"}
        </h2>

        <div className="space-y-5">
          <div>
            <Label>Título</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="Ex: O Vendedor de Sonhos"
              className="bg-card border-border"
            />
          </div>

          <div>
            <Label>Data do Evento</Label>
            <Input
              value={form.event_date}
              onChange={(e) => setForm((f) => ({ ...f, event_date: e.target.value }))}
              placeholder="13/03/2026"
              className="bg-card border-border"
            />
          </div>

          <div>
            <Label>Cidade</Label>
            <Input
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              placeholder="São José dos Campos/SP"
              className="bg-card border-border"
            />
          </div>

          <div>
            <Label>Imagem do Banner</Label>
            {form.image_url && (
              <img src={form.image_url} alt="Preview" className="w-full max-w-xs rounded-lg mb-2 border border-border" />
            )}
            <label className="cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={handleUploadImage} disabled={uploading} />
              <Button asChild variant="outline" disabled={uploading} className="gap-2">
                <span>
                  <Upload size={16} />
                  {uploading ? "Enviando..." : "Enviar Imagem"}
                </span>
              </Button>
            </label>
            <p className="text-xs text-muted-foreground mt-1">Ou cole uma URL abaixo:</p>
            <Input
              value={form.image_url}
              onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
              placeholder="https://..."
              className="bg-card border-border mt-1"
            />
          </div>

          <div>
            <Label>Link do Evento</Label>
            <Input
              value={form.ticket_url}
              onChange={(e) => setForm((f) => ({ ...f, ticket_url: e.target.value }))}
              placeholder="https://site-de-ingressos.com/evento"
              className="bg-card border-border"
            />
          </div>

          <div className="flex items-center gap-3">
            <Switch
              checked={form.published}
              onCheckedChange={(checked) => setForm((f) => ({ ...f, published: checked }))}
            />
            <Label>Publicado</Label>
          </div>

          <Button onClick={handleSave} disabled={saving} className="gradient-primary text-primary-foreground font-bold w-full">
            {saving ? "Salvando..." : editing ? "Atualizar Evento" : "Criar Evento"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-foreground">Próximos Eventos</h1>
        <Button onClick={() => { resetForm(); setCreating(true); }} className="gradient-primary text-primary-foreground font-bold gap-2">
          <Plus size={18} /> Novo Evento
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-card rounded-lg animate-pulse" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">Nenhum evento criado.</p>
      ) : (
        <div className="space-y-3">
          {events.map((event, index) => (
            <div
              key={event.id}
              draggable
              onDragStart={handleDragStart(index)}
              onDragOver={handleDragOver(index)}
              onDrop={handleDrop(index)}
              onDragEnd={handleDragEnd}
              className={`bg-card border rounded-lg p-4 flex items-center justify-between gap-4 transition-all cursor-grab active:cursor-grabbing ${
                dragIndex === index ? "opacity-40 scale-95" : ""
              } ${overIndex === index && dragIndex !== index ? "border-primary ring-1 ring-primary/30" : "border-border"}`}
            >
              <GripVertical size={18} className="text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{event.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {event.published ? "✅ Publicado" : "📝 Rascunho"} · {event.event_date} · {event.city}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(event)}>
                  <Edit2 size={16} />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(event.id)} className="text-destructive">
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUpcomingEvents;
