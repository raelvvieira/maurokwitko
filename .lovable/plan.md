# Reconstruir a página `/clube-de-estudos`

Vou usar o `index.html` do zip como blueprint visual/textual e reescrever a rota existente `src/pages/public/ClubeDeEstudos.tsx` como um componente React, preservando 100% da copy e a ordem das 11 seções listadas no `lovable-import.md`.

## Etapas

1. **Upload dos assets para a CDN do Lovable** (sem versionar binários no repo).
   - Todos os 20 arquivos de `/tmp/clube/assets/` (hero, comunidade, mentor, laptop, CTA final, 8 cards de tópicos, 6 capas de livros) são enviados via `lovable-assets create` e gravados como `src/assets/clube/<nome>.png.asset.json`.
   - Cada pointer JSON é importado no componente e referenciado por `.url`.

2. **Reescrever `src/pages/public/ClubeDeEstudos.tsx`** como uma única página com as seções na ordem do brief:
   1. Hero (headline, subtítulo, CTA, retrato Dr. Mauro)
   2. "Aqui você vai aprender sobre" — carrossel horizontal de cards 3:4 com títulos sobrepostos (8 tópicos)
   3. Acervo — carrossel de livros + benefícios
   4. Plataforma — mockup de notebook + copy curta
   5. Comunidade — imagem + cards de benefícios
   6. "Olá, sou Dr. Mauro" — retrato + estatísticas
   7. Bloco de resumo / ancoragem de valor
   8. Card de assinatura (preço + benefícios) com CTA para `https://chk.eduzz.com/2445141`
   9. "Para quem é"
   10. CTA final com `final-cta-background.png` cobrindo toda a largura do card
   11. FAQ (accordion)
   - Toda copy copiada literalmente do `index.html` do zip.
   - Sem texto dentro de imagens.

3. **Estilo**
   - Paleta clara, azul suave + dourado discreto, glassmorphism leve (já alinhado com tokens existentes `--primary`, `--accent`, `.glass*` em `src/index.css`).
   - Fonte: adicionar Poppins no `<link>` do Google Fonts dentro do componente (via `<style>` inline ou import no head) ou usar a família `font-sans` atual — manterei Plus Jakarta Sans do projeto como body e aplicarei Poppins via classe utilitária na própria página (`font-['Poppins']`) carregando-a em `index.css` com `@import`. Sem trocar a fonte global do app.
   - Cores e sombras via tokens semânticos do `index.css`; nada hardcoded fora do necessário para casar com o mock.

4. **Rota** — `App.tsx` já aponta `/clube-de-estudos` para o componente; nada muda lá.

5. **Verificação** — build + `browser--view_preview` em `/clube-de-estudos` para conferir layout e ausência de erros.

## Detalhes técnicos

- Assets via `lovable-assets create --file /tmp/clube/assets/<x>.png > src/assets/clube/<x>.png.asset.json`, importados como `import hero from "@/assets/clube/generated-hero-mauro.png.asset.json"` e usados como `src={hero.url}`.
- Animações com `framer-motion` (já no projeto), reutilizando o padrão `Variants` que já está tipado no arquivo atual.
- Carrosséis horizontais: `overflow-x-auto snap-x` simples (mais leve que o `Marquee`, que rola infinito; o brief pede carrossel horizontal navegável).
- FAQ: `@/components/ui/accordion` (shadcn já instalado).
- CTA Eduzz mantém `https://chk.eduzz.com/2445141` (mesma URL do componente atual), preservando o forwarding de UTM já configurado em `index.html`.
- Nada é alterado em `i18n/locales/*.json`; toda a copy fica embutida no componente em pt-BR conforme o `index.html` enviado.

## Fora de escopo

- Não mexer em `App.tsx`, header/footer, outras páginas, backend ou config.
- Não adicionar suporte a outros idiomas nesta página (o `index.html` enviado é só pt-BR).
