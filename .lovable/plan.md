

## Plan: Corrigir Embed dos Vídeos do YouTube

### Diagnóstico
Os YouTube IDs estão **corretos** no banco de dados (todos com 11 caracteres válidos). O problema é que o YouTube está bloqueando embeds com a mensagem "Sign in to confirm you're not a bot" — isso acontece especialmente em ambientes de preview/sandbox.

### Correções Propostas

1. **Trocar domínio do embed** — Usar `youtube-nocookie.com` ao invés de `youtube.com` para evitar cookies de rastreamento e reduzir bloqueios:
   - `https://www.youtube-nocookie.com/embed/{id}?autoplay=1&rel=0`

2. **Adicionar atributos de segurança no iframe** — Incluir `referrerpolicy="no-referrer"` e `sandbox` adequado para melhorar compatibilidade

3. **Fallback: botão "Assistir no YouTube"** — Adicionar um link direto `https://youtube.com/watch?v={id}` como alternativa caso o embed falhe, para que o usuário nunca fique sem acesso ao conteúdo

### Arquivos alterados
| Arquivo | Mudança |
|---------|---------|
| `src/pages/Courses.tsx` | Trocar URL do iframe para `youtube-nocookie.com`, adicionar atributos, e link fallback |

### Nota
Na URL publicada (`clubedeestudos.lovable.app`) os embeds devem funcionar normalmente. A proteção anti-bot do YouTube é mais agressiva em ambientes de preview.

