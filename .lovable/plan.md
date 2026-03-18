

## Plano: Gerenciar Links de Redes Sociais pelo Painel Admin

### Problema
Os links das redes sociais (Instagram, YouTube, Facebook, LinkedIn, TikTok) estão hardcoded no `Footer.tsx`. O admin não consegue alterá-los sem mexer no código.

### Solução

#### 1. Criar tabela `social_links` no banco
```sql
CREATE TABLE public.social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL UNIQUE,
  url text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0
);
-- RLS: leitura pública, CRUD para admins
```
Seed com as 5 plataformas (Instagram, YouTube, Facebook, LinkedIn, TikTok) com URLs vazias.

#### 2. Nova aba "Redes Sociais" no Admin (`src/pages/Admin.tsx`)
Adicionar uma 4ª aba no painel admin com um componente `AdminSocialLinks.tsx` que lista as 5 redes com campos de URL editáveis inline — salvar com um botão.

#### 3. Componente `AdminSocialLinks.tsx` (novo)
- Busca os registros de `social_links`
- Exibe cada rede com seu ícone e um campo `Input` para a URL
- Botão "Salvar" que faz update em batch

#### 4. Atualizar `Footer.tsx`
- Buscar URLs de `social_links` via Supabase
- Usar os links dinâmicos no lugar dos hardcoded

### Arquivos
- **Novo**: `src/components/admin/AdminSocialLinks.tsx`
- **Editado**: `src/pages/Admin.tsx` (nova aba)
- **Editado**: `src/components/Footer.tsx` (dados dinâmicos)
- **Migration**: criar tabela + seed

