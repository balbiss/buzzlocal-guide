
CREATE TABLE public.social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL UNIQUE,
  url text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0
);

ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read social links"
ON public.social_links FOR SELECT TO public
USING (true);

CREATE POLICY "Admins can manage social links"
ON public.social_links FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

INSERT INTO public.social_links (platform, url, sort_order) VALUES
  ('instagram', '', 0),
  ('youtube', '', 1),
  ('facebook', '', 2),
  ('linkedin', '', 3),
  ('tiktok', '', 4);
