

## Plano: Adicionar Upload de Fotos no Formulário de Criação de Evento

### Problema
O formulário "Novo Evento" (Eventos Realizados) só tem campos de Título e Ano. Para adicionar fotos, o admin precisa criar o evento primeiro e depois clicar nele — o fluxo não é intuitivo.

### Solução
Modificar o formulário de criação em `AdminEventManager.tsx` para incluir um campo de upload de fotos diretamente. O fluxo será:

1. Admin preenche título e ano
2. Admin seleciona as fotos antes de criar
3. Ao clicar "Criar Evento", o sistema cria o evento no banco e faz upload das fotos em sequência

### Mudanças em `src/components/admin/AdminEventManager.tsx`

- Adicionar state para armazenar arquivos selecionados (`selectedFiles`) e previews
- No formulário de criação (bloco `if (creating)`), adicionar:
  - Campo de upload múltiplo de imagens com preview das fotos selecionadas
  - Possibilidade de remover fotos antes de enviar
- Atualizar `handleCreateEvent` para:
  1. Criar o evento no banco
  2. Fazer upload das fotos selecionadas para o bucket `event-photos`
  3. Inserir registros em `gallery_photos`
  4. Redirecionar para a visualização do evento criado

