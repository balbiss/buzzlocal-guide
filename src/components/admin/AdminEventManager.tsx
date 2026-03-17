import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Trash2, ArrowLeft, Upload, X, GripVertical } from "lucide-react";

type GalleryEvent = {
  id: string;
  title: string;
  year: string;
  sort_order: number;
  created_at: string;
};

type GalleryPhoto = {
  id: string;
  event_id: string;
  image_url: string;
  sort_order: number;
};

const AdminEventManager = () => {
  const [events, setEvents] = useState<GalleryEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [viewingEvent, setViewingEvent] = useState<GalleryEvent | null>(null);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title: "", year: new Date().getFullYear().toString() });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const fetchEvents = useCallback(async () => {
    const { data } = await supabase
      .from("gallery_events")
      .select("*")
      .order("sort_order", { ascending: true });
    setEvents((data as GalleryEvent[]) || []);
    setLoading(false);
  }, []);

  const fetchPhotos = useCallback(async (eventId: string) => {
    const { data } = await supabase
      .from("gallery_photos")
      .select("*")
      .eq("event_id", eventId)
      .order("sort_order", { ascending: true });
    setPhotos((data as GalleryPhoto[]) || []);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleCreateEvent = async () => {
    if (!form.title || !form.year) {
      toast.error("Título e ano são obrigatórios");
      return;
    }
    const { error } = await supabase.from("gallery_events").insert({
      title: form.title,
      year: form.year,
      sort_order: events.length,
    });
    if (error) {
      toast.error("Erro ao criar evento: " + error.message);
    } else {
      toast.success("Evento criado!");
      setForm({ title: "", year: new Date().getFullYear().toString() });
      setCreating(false);
      fetchEvents();
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Tem certeza? Todas as fotos serão excluídas também.")) return;
    
    // Delete photos from storage
    const { data: eventPhotos } = await supabase
      .from("gallery_photos")
      .select("image_url")
      .eq("event_id", id);
    
    if (eventPhotos && eventPhotos.length > 0) {
      const paths = eventPhotos
        .map((p) => {
          const url = p.image_url;
          const match = url.match(/event-photos\/(.+)$/);
          return match ? match[1] : null;
        })
        .filter(Boolean) as string[];
      
      if (paths.length > 0) {
        await supabase.storage.from("event-photos").remove(paths);
      }
    }

    const { error } = await supabase.from("gallery_events").delete().eq("id", id);
    if (error) {
      toast.error("Erro ao excluir evento");
    } else {
      toast.success("Evento excluído");
      fetchEvents();
    }
  };

  const handleViewEvent = (event: GalleryEvent) => {
    setViewingEvent(event);
    fetchPhotos(event.id);
  };

  const handleUploadPhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!viewingEvent || !e.target.files?.length) return;
    setUploading(true);

    const files = Array.from(e.target.files);
    let successCount = 0;

    for (const file of files) {
      const ext = file.name.split(".").pop();
      const fileName = `${viewingEvent.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      
      const { error: uploadError } = await supabase.storage
        .from("event-photos")
        .upload(fileName, file);

      if (uploadError) {
        toast.error(`Erro ao enviar ${file.name}: ${uploadError.message}`);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from("event-photos")
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase.from("gallery_photos").insert({
        event_id: viewingEvent.id,
        image_url: urlData.publicUrl,
        sort_order: photos.length + successCount,
      });

      if (insertError) {
        toast.error(`Erro ao salvar ${file.name}`);
      } else {
        successCount++;
      }
    }

    if (successCount > 0) {
      toast.success(`${successCount} foto(s) adicionada(s)!`);
      fetchPhotos(viewingEvent.id);
    }
    setUploading(false);
    e.target.value = "";
  };

  const handleDeletePhoto = async (photo: GalleryPhoto) => {
    const match = photo.image_url.match(/event-photos\/(.+)$/);
    if (match) {
      await supabase.storage.from("event-photos").remove([match[1]]);
    }
    const { error } = await supabase.from("gallery_photos").delete().eq("id", photo.id);
    if (error) {
      toast.error("Erro ao excluir foto");
    } else {
      toast.success("Foto excluída");
      if (viewingEvent) fetchPhotos(viewingEvent.id);
    }
  };

  // Viewing single event photos
  if (viewingEvent) {
    return (
      <div>
        <Button variant="ghost" size="sm" onClick={() => { setViewingEvent(null); setPhotos([]); }} className="gap-2 mb-6 text-muted-foreground">
          <ArrowLeft size={16} /> Voltar
        </Button>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{viewingEvent.title}</h2>
            <p className="text-sm text-muted-foreground">{viewingEvent.year} • {photos.length} foto(s)</p>
          </div>
          <label className="cursor-pointer">
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleUploadPhotos}
              disabled={uploading}
            />
            <Button asChild disabled={uploading} className="gradient-primary text-primary-foreground font-bold gap-2">
              <span>
                <Upload size={16} />
                {uploading ? "Enviando..." : "Adicionar Fotos"}
              </span>
            </Button>
          </label>
        </div>

        {photos.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">Nenhuma foto adicionada.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group aspect-square rounded-lg overflow-hidden border border-border">
                <img src={photo.image_url} alt="" className="w-full h-full object-cover" loading="lazy" />
                <button
                  onClick={() => handleDeletePhoto(photo)}
                  className="absolute top-2 right-2 h-7 w-7 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Creating new event form
  if (creating) {
    return (
      <div>
        <Button variant="ghost" size="sm" onClick={() => setCreating(false)} className="gap-2 mb-6 text-muted-foreground">
          <ArrowLeft size={16} /> Voltar
        </Button>

        <h2 className="text-2xl font-bold text-foreground mb-6">Novo Evento</h2>

        <div className="space-y-5">
          <div>
            <Label>Título do Evento</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="Ex: Workshop de Marketing Digital"
              className="bg-card border-border"
            />
          </div>
          <div>
            <Label>Ano</Label>
            <Input
              value={form.year}
              onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
              placeholder="2025"
              className="bg-card border-border"
            />
          </div>
          <Button onClick={handleCreateEvent} className="gradient-primary text-primary-foreground font-bold w-full">
            Criar Evento
          </Button>
        </div>
      </div>
    );
  }

  // Events list
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-foreground">Eventos da Galeria</h1>
        <Button onClick={() => setCreating(true)} className="gradient-primary text-primary-foreground font-bold gap-2">
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
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-card border border-border rounded-lg p-4 flex items-center justify-between gap-4"
            >
              <button onClick={() => handleViewEvent(event)} className="flex-1 min-w-0 text-left">
                <h3 className="font-semibold text-foreground truncate">{event.title}</h3>
                <p className="text-xs text-muted-foreground">{event.year}</p>
              </button>
              <Button variant="ghost" size="sm" onClick={() => handleDeleteEvent(event.id)} className="text-destructive">
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEventManager;
