## Problema identificado

A página **Perfil & Configurações** mostra "Alex Martins / alex@email.com" para qualquer pessoa que fizer login, independente de quem ela seja. Isso acontece porque em `src/context/AppContext.tsx` o objeto `profile` está **fixo no código** (mock antigo de demonstração):

```ts
const profile: UserProfile = {
  name: 'Alex Martins', email: 'alex@email.com', ...
};
```

O TopBar do canto superior direito já mostra o nome correto (ex: "nadjalima89") porque ele usa `userEmail` do `useAuth`, mas a página de Perfil ignora esse dado e lê do mock.

Não há vazamento de dados entre usuários — todos veem o mesmo nome fictício. Apenas é um placeholder que nunca foi substituído pelos dados reais.

## Correção

### 1. `src/context/AppContext.tsx`
Substituir o `profile` hardcoded por dados derivados do usuário autenticado:

- `email`: vem de `user.email` (Supabase Auth).
- `name`: usar, em ordem de prioridade:
  1. `user.user_metadata.name` (caso já esteja gravado),
  2. nome encontrado em `paid_customers` ou `legacy_active_users` pelo email,
  3. fallback: parte do email antes do `@`.
- `rank`, `streak`, `badge`, `totalScore`: por enquanto manter zerados/neutros (esses números do mock — "#4 Ranking", "15 streak", "Rising Star" — também são fictícios e não refletem nada real do usuário).

Para buscar o nome real, criar um pequeno hook `useProfileInfo()` que, quando há `user.email`, consulta:
```ts
supabase.from('paid_customers').select('name').eq('email', email).maybeSingle()
// se não achar:
supabase.from('legacy_active_users').select('name').eq('email', email).maybeSingle()
```
e guarda o resultado em estado. O `AppProvider` passa esses valores para o `profile`.

### 2. `src/pages/Profile.tsx`
- Continuar usando `profile.name` e `profile.email` — agora corretos.
- Remover (ou desabilitar) o botão **"Salvar Alterações"** dos campos Nome/Email, já que:
  - o e-mail é a chave de acesso (não pode ser alterado livremente sem refazer login),
  - o nome real vem de `paid_customers`. 
  
  Alternativa mais simples nesta etapa: deixar o nome editável e, ao salvar, atualizar `user.user_metadata.name` via `supabase.auth.updateUser({ data: { name } })`. O e-mail fica somente leitura.
- Esconder ou neutralizar os blocos de **#Ranking, Streak, Badge** enquanto não houver lógica real por trás (atualmente são números inventados iguais para todo mundo).

### 3. Memória do projeto
Atualizar `mem://design/user-persona-and-ux-principles` (ou criar uma nova entrada) registrando: "Perfil deve sempre refletir o usuário autenticado; nunca usar dados mock no `AppContext.profile`."

## Arquivos a editar
- `src/context/AppContext.tsx`
- `src/pages/Profile.tsx`
- (novo) hook simples dentro de `AppContext.tsx` ou em `src/hooks/useProfileInfo.ts`
- `mem://...` para registrar a regra

## Pergunta para você antes de implementar
Sobre os blocos **#Ranking, Streak, Badge** na página de perfil — eles hoje mostram números fictícios iguais para todos. Quer que eu:
- **(A)** Esconda esses blocos enquanto não houver dados reais, ou
- **(B)** Mantenha visualmente, mas zerados ("—" ou "0"), ou
- **(C)** Mantenha como está e tratamos isso depois.

Posso assumir **(A)** se preferir, mas confirme antes de eu prosseguir.