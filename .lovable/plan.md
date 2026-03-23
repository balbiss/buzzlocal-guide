

## Plano: Drag-and-Drop para Reordenar Eventos

### O que será feito
Adicionar funcionalidade de arrastar e soltar (drag & drop) nas listas de **Eventos da Galeria** e **Próximos Eventos** no painel admin, permitindo reorganizar a ordem de exibição na página principal.

### Abordagem
Usar a API nativa de HTML5 Drag and Drop (sem bibliotecas externas) com visual de "segurar e arrastar" usando o ícone `GripVertical` (já importado no AdminEventManager).

### Mudanças

#### 1. `src/components/admin/AdminEventManager.tsx`
- Adicionar handlers de drag (`onDragStart`, `onDragOver`, `onDrop`) na lista de eventos
- Ao soltar, reordenar o array local e salvar os novos `sort_order` no banco (`gallery_events`)
- Adicionar ícone de grip visível em cada item da lista

#### 2. `src/components/admin/AdminUpcomingEvents.tsx`
- Mesma lógica: handlers de drag na lista de próximos eventos
- Salvar novos `sort_order` na tabela `upcoming_events`
- Adicionar ícone de grip em cada item

### Detalhes técnicos
- Ao finalizar o drag, fazer update em batch: `supabase.from("tabela").update({ sort_order: i }).eq("id", id)` para cada item reordenado
- Feedback visual: item sendo arrastado com opacidade reduzida, destaque no destino

