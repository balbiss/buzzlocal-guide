

## Plano: Gerenciamento Completo de Eventos no Painel Admin

### Situação Atual
- **"Nossos Eventos" (próximos)**: dados hardcoded no código (`EventsSection.tsx`) — não gerenciável pelo admin
- **"Eventos Realizados" (galeria)**: já parcialmente gerenciável via aba "Eventos" no admin (tabelas `gallery_events` + `gallery_photos`), mas misturado com itens estáticos hardcoded

### O que será feito

#### 1. Nova tabela `upcoming_events` no banco de dados
Campos: `id`, `title`, `date`, `city`, `image_url`, `whatsapp_message`, `sort_order`, `published`, `created_at`
Com RLS: leitura pública, CRUD para admins.

#### 2. Reorganizar o painel admin com 3 abas
- **Blog** (já existe)
- **Próximos Eventos** (novo) — CRUD para os eventos do carrossel "Nossos Eventos"
- **Eventos Realizados** (já existe como "Eventos") — CRUD para a galeria de portfolio

#### 3. Componente `AdminUpcomingEvents`
- Listar, criar, editar e excluir próximos eventos
- Upload de imagem de banner para cada evento (usando o bucket `event-photos`)
- Campos: título, data, cidade, mensagem do WhatsApp, publicado sim/não

#### 4. Atualizar `EventsSection.tsx`
- Trocar os dados hardcoded por consulta ao banco (`upcoming_events`)
- Manter o mesmo layout de carrossel com banner + data + cidade + botão WhatsApp

#### 5. Atualizar `GallerySection.tsx`
- Remover os itens estáticos hardcoded (ou mantê-los como fallback, conforme preferir)
- Exibir apenas os eventos do banco de dados, tornando tudo gerenciável pelo admin

### Detalhes Técnicos

**Migration SQL:**
```sql
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

-- Políticas RLS
CREATE POLICY "Anyone can read published upcoming events"
  ON public.upcoming_events FOR SELECT TO public
  USING (published = true);

CREATE POLICY "Admins can manage upcoming events"
  ON public.upcoming_events FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
```

**Arquivos modificados/criados:**
- `src/components/admin/AdminUpcomingEvents.tsx` — novo componente CRUD
- `src/pages/Admin.tsx` — adicionar terceira aba "Próximos Eventos"
- `src/components/EventsSection.tsx` — consumir dados do banco
- `src/components/GallerySection.tsx` — opcionalmente remover itens estáticos

