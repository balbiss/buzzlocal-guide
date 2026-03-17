
CREATE TABLE public.upcoming_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  event_date text NOT NULL,
  city text NOT NULL,
  image_url text NOT NULL,
  whatsapp_message text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.upcoming_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published upcoming events"
  ON public.upcoming_events FOR SELECT TO public
  USING (published = true);

CREATE POLICY "Admins can manage upcoming events"
  ON public.upcoming_events FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
