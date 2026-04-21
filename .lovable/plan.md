

## Plano: ajustes no header, artigos com imagens, hero, e capas dos hinos

### 1. Header: dropdowns independentes (`src/components/public/PublicHeader.tsx`)

**Bug:** estado único `coursesOpen` controla os dois dropdowns (Cursos e Rádio), por isso ambos abrem ao mesmo tempo.

**Correção:** trocar `coursesOpen` por `openMenu: string | null` (guarda o `label` do item ativo). Cada dropdown abre/fecha checando `openMenu === item.label`. Mesma lógica no mobile (`mobileOpenMenu`).

### 2. Imagens nos artigos (Unsplash) — banco central

**Arquivo novo:** `src/data/articleImages.ts` exportando `ARTICLE_IMAGES: Record<slug, string>`. URLs do Unsplash (`?w=800&q=80`), tamanho médio, temas neutros e relacionados a saúde/cotidiano (sem misticismo):

- `transtorno-do-espectro-autista` — criança brincando com blocos coloridos
- `beneficios-contraindicacoes-da-regressao` — pessoa sentada relaxada/meditação simples
- `investigacao-do-inconsciente-em-criancas` — criança desenhando com lápis
- `mensagem-aos-espiritas` — livro aberto sobre mesa
- `o-livro-dos-espiritos` — pilha de livros antigos
- `a-etica-da-investigacao-do-inconsciente` — aperto de mãos / consultório
- `mensagem-aos-psicologos-e-psiquiatras` — estetoscópio / consultório clínico
- `o-tratamento` — sofá de terapia / consultório
- `por-que-a-psicologia-e-a-psiquiatria-nao-lidam-com-a-reencarnacao` — cérebro/anatomia médica
- `psicoterapia-para-quem-ouve-vozes` — pessoa pensativa de perfil
- `a-verdadeira-e-a-falsa-rebeldia-jovem` — adolescentes conversando
- `freud-alem-da-vida` — caderno e caneta sobre mesa de estudo
- `visao-espiritual-fobias-panico-depressao-dores-cronicas` — mãos cobrindo o rosto (ansiedade simples)
- `depressao` — pessoa olhando pela janela
- `fibromialgia` — pessoa com dor no ombro / fisioterapia
- `transtorno-do-panico` — coração / batimento (saúde)
- `jovens-guerreiros-da-luz-e-a-cannabis` — folha verde / planta natural
- `fobias` — escada/altura discreta (objeto comum)

Helper `getArticleImage(slug)` com fallback para uma imagem genérica de livro.

### 3. Cards de artigos com imagem

**`src/pages/public/Artigos.tsx`** — substituir o quadradinho com ícone `BookText` por uma capa `aspect-[16/10]` com `<img src={getArticleImage(art.slug)} loading="lazy" />` e overlay sutil. Ícone removido.

**`src/pages/public/Home.tsx` — seção "Artigos Recentes":**
- Remover o array `ARTICLES` mockado.
- Importar `ARTICLES` de `@/data/articles` e usar `.slice(0, 3)` (ou os 3 últimos).
- Trocar o placeholder gradiente por `<img src={getArticleImage(slug)} />`.
- Card vira `<Link to={'/artigos/' + slug}>` (clicável).
- Remover linha de categoria/data (não existem nos artigos reais).

**`src/pages/public/ArtigoDetalhe.tsx`** — adicionar uma capa hero (aspect-[21/9]) com a imagem do artigo logo abaixo do header, `rounded-2xl`.

### 4. Hero da Home — copy ampliada para psicoterapeutas + profissionais de saúde

Em `src/pages/public/Home.tsx` (linhas 75-98):

- **Eyebrow:** "30+ anos de prática clínica e formação"
- **Título:** "Ciência, Clínica e *Despertar Espiritual*" (mantém o serif itálico no último)
- **Subtítulo:**  
  "Há mais de três décadas, o Dr. Mauro Kwitko integra a Psicoterapia de Regressão à prática clínica — oferecendo a psicoterapeutas, médicos e demais profissionais da saúde uma abordagem onde rigor científico, escuta clínica e profundidade da alma se encontram."
- **CTAs:** "Conheça o Método" (primary, → `/formacao`) + "Formação para Profissionais" (outline, → `/formacao`) + "Pesquisas e Artigos" (ghost link, → `#artigos`).
- Adicionar pequeno faixa de selos de credibilidade abaixo dos botões: `CRM 5761 · UFRGS · Fundador da ABPR` (texto fino, `text-xs text-muted-foreground`).

### 5. Capas quadradas dos Hinos (3 imagens fornecidas)

Mapeamento:
- Paz → `https://i.ibb.co/v6fpPVzb/HINOS-DE-PAZ-2.png`
- Amor → `https://i.ibb.co/q3GHxr4p/HINOS-DE-AMOR-2.png`
- Fé → `https://i.ibb.co/TDs4sdxQ/HINOS-DE-F-2-2.png`

**`src/pages/public/HinosEspirituais.tsx`** — substituir o bloco `aspect-video` com ícone `Music` por `<img src={cover} className="w-full aspect-square object-cover" />` (formato quadrado conforme pedido). Cards do grid passam a ter capa quadrada + bloco de informações abaixo.

**`src/pages/Library.tsx` (área do clube)** — criar mapa `ALBUM_COVER_MAP` (mesmas 3 URLs) por título do álbum em maiúsculas. No bloco `w-32 h-32` com `Disc3` (linhas 53-55), se houver capa correspondente, renderizar `<img src={cover} className="w-32 h-32 rounded-xl object-cover" />` em vez do gradiente+ícone. Mantém quadrado.

### Arquivos

**Criados:**
- `src/data/articleImages.ts`

**Alterados:**
- `src/components/public/PublicHeader.tsx` — fix dropdowns independentes
- `src/pages/public/Home.tsx` — hero reformulada, "Artigos Recentes" puxando dados reais com imagens
- `src/pages/public/Artigos.tsx` — cards com imagem
- `src/pages/public/ArtigoDetalhe.tsx` — imagem hero
- `src/pages/public/HinosEspirituais.tsx` — capas quadradas reais
- `src/pages/Library.tsx` — capas quadradas reais nos álbuns do clube

**Sem mudanças:** Supabase, rotas, Marquee, Footer, dados dos artigos.

