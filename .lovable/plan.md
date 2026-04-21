

## Plano: Spotify nos hinos, player com lista, limpeza do curso, novas imagens nos artigos e nova página "Clube de Estudos"

### 1. Hinos Espirituais (`src/pages/public/HinosEspirituais.tsx`)

**Card do Spotify (abaixo dos 3 hinários):**
- Novo bloco em `max-w-3xl mx-auto mt-12`, card com gradiente verde Spotify (`from-emerald-600 to-green-700`) e ícone Spotify (SVG inline ou `lucide-react` com path custom).
- Título: "Me encontre também no Spotify".
- Subtítulo: "Ouça hinos, meditações e podcasts do Dr. Mauro direto no seu app preferido."
- Botão branco com texto verde: "Abrir no Spotify" → `https://open.spotify.com/intl-pt/artist/4ca3uyMhCggB6s0XImv9ds?si=FxBhz20TTrGug9tEqfurqw` (target `_blank`).

**Player com lista de faixas (estilo Library do clube):**
- Substituir o `Dialog` simples (iframe único) por um `Dialog` mais largo (`max-w-4xl`) com layout em 2 colunas no desktop:
  - **Esquerda (player):** iframe atual da playlist do YouTube em `aspect-video`.
  - **Direita (lista de faixas):** lista vertical scrollável (`max-h-[480px] overflow-y-auto`) com as faixas do hinário, mostrando miniatura YouTube (`https://img.youtube.com/vi/${id}/mqdefault.jpg`), número e título. Ao clicar numa faixa, troca o `src` do iframe para o vídeo individual com `autoplay=1`.
- Mapear cada hinário a um array de tracks (id YouTube + título). Como dado, criar `src/data/hinosTracks.ts` com as faixas conhecidas dos 3 álbuns (reaproveitar do `AppContext` se já existir; caso contrário, inicializar com a playlist completa via `videoseries` + faixas estáticas mínimas — usar a playlist como fallback "Tocar tudo" no topo).
- Mobile: empilhar player em cima, lista embaixo.

### 2. Página do Curso On-line (`src/pages/public/CursoOnline.tsx`)

- **Remover** as 3 seções de imagem temáticas (linhas 106-128 e 191-201). Manter espaçamentos via `mt-16` entre blocos restantes (Intro → Módulos → Avaliações → CTA).

### 3. Imagens de artigos ajustadas (`src/data/articleImages.ts`)

Trocar URLs Unsplash dos 8 artigos pedidos por imagens **mais alinhadas ao tema clínico/cotidiano** (sem misticismo):

| Slug | Tema buscado | Nova imagem (Unsplash) |
|---|---|---|
| `investigacao-do-inconsciente-em-criancas` | criança desenhando com lápis de cor | `photo-1587654780291-39c9404d746b?w=800&q=80` |
| `mensagem-aos-psicologos-e-psiquiatras` | consultório/estetoscópio em mesa clínica | `photo-1576091160550-2173dba999ef?w=800&q=80` |
| `o-tratamento` | duas cadeiras de terapia / sofá clínico | `photo-1591343395082-e120087004b4?w=800&q=80` |
| `por-que-a-psicologia-e-a-psiquiatria-nao-lidam-com-a-reencarnacao` | livros + estetoscópio (ciência+saúde) | `photo-1532187863486-abf9dbad1b69?w=800&q=80` |
| `visao-espiritual-fobias-panico-depressao-dores-cronicas` | mãos no rosto, ansiedade discreta | `photo-1541199249251-f713e6145474?w=800&q=80` |
| `depressao` | pessoa pensativa olhando pela janela | `photo-1516534775068-ba3e7458af70?w=800&q=80` |
| `transtorno-do-panico` | mão sobre o peito (coração acelerado) | `photo-1559757148-5c350d0d3c56?w=800&q=80` |
| `fobias` | escada/altura comum (objeto cotidiano) | `photo-1551269901-5c5e14c25df7?w=800&q=80` (mantida — já adequada) ou troca por `photo-1500382017468-9049fed747ef` |

(URLs definitivas ajustadas durante implementação verificando no Unsplash; sem mística.)

### 4. Novo menu e página "Clube de Estudos" (página de vendas)

**Header (`PublicHeader.tsx`):**
- Adicionar item `Clube de Estudos` → `/clube-de-estudos`, posicionado **antes** do botão "Entrar no Clube".

**Rota nova (`src/App.tsx`):** `/clube-de-estudos` → `ClubeDeEstudos` (dentro do `PublicLayout`).

**Página nova (`src/pages/public/ClubeDeEstudos.tsx`):** página de vendas inspirada nas referências, mas com o design do site (glassmorphism, primary slate-blue, emerald nos CTAs, cards `rounded-3xl ring-1 ring-border/40`):

1. **Hero** (split 2 colunas):
   - Esquerda: eyebrow "COMUNIDADE EXCLUSIVA", título "Clube de Estudos *Dr. Mauro Kwitko*", subtítulo destacando comunidade, conversas e trocas com profissionais buscando reforma íntima e espiritualidade. CTA verde grande "Assine agora — R$ 29/mês" → `/login`. Linha fina: "Cancele quando quiser".
   - Direita: foto do Dr. Mauro (mesma da Home).

2. **Faixa de benefícios** (4 ícones em grid): Comunidade ativa · Grupo VIP no WhatsApp · Lives exclusivas com convidados · Acervo completo (e-books, aulas, hinos).

3. **"Acesse todos os conteúdos do Dr. Mauro"** — grid 3 cards reaproveitando capas reais dos livros (`books.ts`): Fogo Selvagem, Viver Para Servir, Baixa Autoestima.

4. **Seções de conteúdo** (estilo da imagem 23/24 com ícone + texto à esquerda e visual à direita):
   - Acesse E-books e Futuros Lançamentos.
   - Acesso a Lives e Aulas Gravadas (card mock "LIVE #01 — Autismo em Adultos").
   - Acesso ao Curso Gravado: A Reforma Íntima.
   - Hinários (com capas dos 3 hinos quadradas).

5. **"Reforço da Comunidade"** — bloco grande com título "Mais que conteúdo: uma comunidade", parágrafo destacando troca com **psicoterapeutas, médicos e demais profissionais de saúde** que buscam aprofundar reforma íntima, espiritualidade e Psicoterapia Reencarnacionista. Lista bullet: conversar em fóruns internos, comentar aulas, postar relatos, participar do grupo VIP no WhatsApp, receber em primeira mão lives com entrevistados.

6. **"Conteúdos que você verá"** — 3 thumbnails mock (As Armadilhas Terrenas, Por que a Psicologia não lida com a Reencarnação, O Mapa do Ego), com botão "Assine agora".

7. **Card de preço destaque** (centralizado, `max-w-xl`, ring-2 ring-primary, sombra forte):
   - "Acesso Mensal ao Clube"
   - Preço grande: **R$ 29** /mês
   - Lista com check ✓: Comunidade exclusiva · Grupo VIP no WhatsApp · Lives com convidados especiais · Acervo de e-books e aulas · Hinários · Curso Reforma Íntima · Cancele quando quiser
   - Botão emerald CTA "Assinar agora" → `/login` (futuramente integrável a checkout).

8. **FAQ curto** (4–6 perguntas: O que recebo? Posso cancelar? Como acesso? Quem pode participar?).

9. **CTA final** + footer já vem do PublicLayout.

**Atualização de preço em outros locais:** verificar se há banners "R$ 24,90" no público — se houver, atualizar para R$ 29 (texto livre só nessa nova página por ora).

### Arquivos

**Criados:**
- `src/pages/public/ClubeDeEstudos.tsx`
- `src/data/hinosTracks.ts` (faixas dos 3 hinários para o player com lista)

**Alterados:**
- `src/pages/public/HinosEspirituais.tsx` — card Spotify + dialog em 2 colunas com lista de faixas clicáveis.
- `src/pages/public/CursoOnline.tsx` — remoção das 3 imagens temáticas.
- `src/data/articleImages.ts` — novas URLs para os 8 artigos listados.
- `src/components/public/PublicHeader.tsx` — item "Clube de Estudos" adicionado.
- `src/App.tsx` — rota `/clube-de-estudos`.

**Sem mudanças:** Library (clube), área `/app/*`, Supabase, marquee, footer.

