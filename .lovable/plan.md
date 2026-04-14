

## Plano: Sistema Completo de Notificações — Abordagem em Fases

Este é um sistema muito grande. Para garantir qualidade e funcionalidade, a implementação será dividida em **3 fases**. Este plano cobre a **Fase 1** (fundação) que viabiliza todas as fases seguintes.

---

### Realidade atual do projeto

O projeto **não possui** rastreamento de progresso de aulas, registro de último login, campo `whatsapp_joined`, nem qualquer sistema de atividade do usuário. Muitos gatilhos descritos (aula pausada em 20-80%, dias sem login, módulo completo, etc.) dependem de infraestrutura que ainda não existe. A Fase 1 constrói a base; as Fases 2 e 3 adicionam os gatilhos avançados progressivamente.

---

### FASE 1 — Fundação (este plano)

**1. Tabela `notifications`** (migration)
```sql
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb DEFAULT '{}'
);
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
-- Usuário só vê/atualiza suas próprias notificações
CREATE POLICY "Users view own" ON notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users update own" ON notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id);
-- Admin pode inserir para qualquer usuário
CREATE POLICY "Service insert" ON notifications FOR INSERT TO authenticated WITH CHECK (true);
-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
```

**2. Hook `useNotifications`** (`src/hooks/useNotifications.ts`)
- Query das últimas 20 notificações do usuário logado
- Contagem de não lidas
- Mutation para marcar como lida (individual e todas)
- Subscription realtime para novas notificações

**3. Componente `NotificationDropdown`** (`src/components/NotificationDropdown.tsx`)
- Popover/dropdown que abre ao clicar no sininho
- Badge vermelho com contagem de não lidas
- Lista de notificações com ícone por tipo, título, mensagem resumida, tempo relativo
- Fundo destacado para não lidas
- Botão "Marcar todas como lidas"
- Clique na notificação → marca como lida + navega para `metadata.url`
- Link "Ver todas" → `/notificacoes`

**4. Atualizar `TopBar.tsx`**
- Substituir o botão estático do sininho pelo `NotificationDropdown`

**5. Página `/notificacoes`** (`src/pages/Notifications.tsx`)
- Histórico completo com paginação (20 por vez)
- Filtro por tipo e lida/não lida
- Nova rota em `App.tsx`

**6. Edge function `send-notification`** (`supabase/functions/send-notification/index.ts`)
- Recebe `{ user_id, type, title, message, metadata }` ou `{ all_users: true, ... }` para broadcast
- Insere na tabela `notifications`
- Protegida: valida JWT e verifica se é admin (email = `raelvvieira@gmail.com`) para broadcast

**7. Aba "Notificações" no Admin** (`src/pages/Admin.tsx`)
- Nova tab no painel de administração
- Formulário para disparo manual: tipo (community_highlight, live_event, weekly_reflection, custom), título, mensagem, destino, para todos ou usuário específico
- Lista de notificações enviadas com filtro por tipo/data
- Métricas básicas: total enviadas, total lidas, taxa de leitura

**8. Trigger de boas-vindas (`welcome`)**
- Database trigger `AFTER INSERT ON auth.users` que chama `pg_net.http_post` para a edge function `send-notification` com delay simulado (ou disparo imediato com mensagem de boas-vindas)

---

### FASE 2 — Gatilhos baseados em atividade (plano futuro)
Requer criar tabelas de rastreamento (`user_activity`, `lesson_progress`, campo `whatsapp_joined` em profiles). Inclui: `comment_reply`, `post_liked`, `new_lesson`, `module_complete`, `first_comment_invite`, `whatsapp_invite_1`.

### FASE 3 — Gatilhos agendados (plano futuro)
Requer `pg_cron` + edge functions agendadas. Inclui: `weekly_reminder`, `reactivation`, `no_first_lesson`, `weekly_no_lesson`, `weekly_reflection`, `member_anniversary`, `ranking_up`, `achievement`, etc.

---

### Arquivos criados/editados na Fase 1
- Migration SQL (nova tabela `notifications` + RLS + realtime)
- `src/hooks/useNotifications.ts` (novo)
- `src/components/NotificationDropdown.tsx` (novo)
- `src/components/TopBar.tsx` (editar — integrar dropdown)
- `src/pages/Notifications.tsx` (novo)
- `src/pages/Admin.tsx` (editar — nova aba)
- `src/App.tsx` (editar — nova rota)
- `supabase/functions/send-notification/index.ts` (novo)
- Migration SQL para trigger de welcome

### Detalhes Técnicos
- Realtime via `supabase.channel('notifications').on('postgres_changes', ...)`
- Tempo relativo com `date-fns` (já disponível via dependências do shadcn calendar)
- Paginação via `.range(from, to)` no Supabase client
- Ícones por tipo mapeados em um objeto constante

