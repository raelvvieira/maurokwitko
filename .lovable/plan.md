

## Plano: Corrigir acesso do usuário mauroabpr@gmail.com

### Diagnóstico

A conta `mauroabpr@gmail.com` **não existe no banco de dados**. Os logs de autenticação mostram 2 tentativas de login com erro "Invalid login credentials" vindas do IP do usuário. A conta nunca foi cadastrada (signup).

A tela branca que o usuário relatou é o resultado esperado de um login que falha — porém o formulário deveria mostrar a mensagem de erro "Invalid login credentials" e não uma tela branca. É possível que o usuário tenha tentado criar a conta e depois logou com sucesso, mas algum componente crashou.

O código de login em si trata erros corretamente. Não há bug de tela branca no fluxo de login/signup.

### Ações

1. **Criar a conta `mauroabpr@gmail.com` programaticamente** via Supabase Admin API (usando a edge function ou service role key) com a senha `mauro2026`, garantindo que ela já fique confirmada e pronta para uso.

2. **Verificar se o admin já está na lista de emails** — já está em `useAuth.ts` e na edge function `send-notification`, então o acesso admin estará garantido após a conta existir.

### Arquivos alterados
- Nenhum arquivo de código será alterado — apenas uma operação de criação de usuário no banco via API admin do Supabase.

### Detalhe técnico
- Será usado `supabase.auth.admin.createUser()` via uma chamada direta ou SQL para inserir o usuário com email confirmado e senha definida.

