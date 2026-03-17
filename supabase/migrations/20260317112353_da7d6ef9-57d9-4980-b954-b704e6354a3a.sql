
-- Create gallery_events table
CREATE TABLE public.gallery_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  year text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create gallery_photos table
CREATE TABLE public.gallery_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES public.gallery_events(id) ON DELETE CASCADE NOT NULL,
  image_url text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gallery_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can read events" ON public.gallery_events FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can read photos" ON public.gallery_photos FOR SELECT TO public USING (true);

-- Admin write access
CREATE POLICY "Admins can insert events" ON public.gallery_events FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update events" ON public.gallery_events FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete events" ON public.gallery_events FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert photos" ON public.gallery_photos FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update photos" ON public.gallery_photos FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete photos" ON public.gallery_photos FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for event photos
INSERT INTO storage.buckets (id, name, public) VALUES ('event-photos', 'event-photos', true);

-- Storage policies
CREATE POLICY "Anyone can view event photos" ON storage.objects FOR SELECT TO public USING (bucket_id = 'event-photos');
CREATE POLICY "Admins can upload event photos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'event-photos' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete event photos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'event-photos' AND public.has_role(auth.uid(), 'admin'));
