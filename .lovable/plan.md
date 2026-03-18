

## Plano: Trocar campo "Mensagem do WhatsApp" por "Link do Evento"

### Problema
O campo `whatsapp_message` está sendo usado para montar um link de WhatsApp, mas o admin quer colocar um link direto (ex: site de venda de ingressos) onde o usuário será redirecionado ao clicar no evento.

### Mudanças

#### 1. Renomear campo no banco de dados
Migration para renomear a coluna `whatsapp_message` → `ticket_url` na tabela `upcoming_events`.

#### 2. Atualizar `AdminUpcomingEvents.tsx`
- Trocar label "Mensagem do WhatsApp" por "Link do Evento" 
- Placeholder: "https://site-de-ingressos.com/evento"

#### 3. Atualizar `EventsSection.tsx`
- Remover a constante `WHATSAPP_URL` e o `encodeURIComponent`
- Usar `event.ticket_url` diretamente como `href` do link

#### Arquivos afetados
- Migration SQL (rename column)
- `src/components/admin/AdminUpcomingEvents.tsx`
- `src/components/EventsSection.tsx`

