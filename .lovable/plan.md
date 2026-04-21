

## Plano: reordenar menu + Hero como carrossel de 3 slides

### 1. Reordenar menu do cabeçalho (`src/components/public/PublicHeader.tsx`)
Mover `Clube de Estudos` no array `NAV` para logo após `Quem Sou Eu`. Nova ordem:
1. Home
2. Quem Sou Eu
3. **Clube de Estudos** ← movido
4. Cursos
5. Livros e E-books
6. Hinos Espirituais
7. Rádio
8. Artigos

Aplica-se ao desktop e mobile (ambos usam o mesmo array).

### 2. Hero como carrossel automático de 3 slides (`src/pages/public/Home.tsx`)

Substituir a seção `{/* HERO */}` (linhas 53-98) por um carrossel usando o componente `Carousel` do shadcn (`src/components/ui/carousel.tsx`) com plugin **embla-carousel-autoplay** (já disponível com embla, vamos importar `embla-carousel-autoplay`).

**Estrutura:** mesmo layout grid 2 colunas (texto à esquerda, imagem à direita), mesmas classes/animações/tipografia atuais. O que muda é só o conteúdo de cada slide.

**Slide 1 — Atual (Dr. Mauro / Formação)**
- Eyebrow: "30+ ANOS DE PRÁTICA CLÍNICA E FORMAÇÃO"
- H1: "Psicoterapia Reencarnacionista e *Investigação do Inconsciente*"
- Parágrafo atual sobre as 3 décadas
- CTA verde: "Conheça nossa Formação →" → `/formacao`
- Imagem: a foto atual do Dr. Mauro (i.ibb.co/mCWzv6QL)
- Legenda: "CRM 5761 · UFRGS · Fundador da ABPR"

**Slide 2 — Clube de Estudos**
- Eyebrow: "COMUNIDADE EXCLUSIVA DE MEMBROS"
- H1: "Clube de Estudos *Dr. Mauro Kwitko*"
- Parágrafo: "Acesse aulas, hinos espirituais, e-books, rádio e uma comunidade ativa em torno da Psicoterapia Reencarnacionista. Tudo num só lugar, com curadoria do Dr. Mauro."
- CTA verde: "Entrar no Clube →" → `/clube-de-estudos`
- Imagem: `https://i.ibb.co/HDQbPzRX/AULAS-PR-TICAS.jpg` (ou outra do GALLERY)
- Legenda: "Aulas, hinos, e-books e comunidade"

**Slide 3 — Curso Online**
- Eyebrow: "CURSO ONLINE COMPLETO"
- H1: "A Psicologia da *Reencarnação*"
- Parágrafo: "Aprenda no seu ritmo os fundamentos da Psicoterapia Reencarnacionista, condensados em quase 30 anos de prática clínica. R$ 297 — em até 12x."
- CTA verde: "Conhecer o Curso Online →" → `/curso-online`
- Imagem: `https://i.ibb.co/MDJBY2J0/AULAS-TE-RICAS.jpg`
- Legenda: "Acesso vitalício · 2 aulas gratuitas"

**Comportamento do carrossel:**
- Autoplay: avanço a cada **6 segundos**, `loop: true`, `stopOnInteraction: false`, `stopOnMouseEnter: true`
- Transição suave (embla padrão)
- Indicadores (dots) abaixo do hero, clicáveis, com bolinha ativa em `bg-primary` e inativa em `bg-border`
- Setas de navegação **escondidas no mobile** (só dots), visíveis discretamente no desktop nas laterais
- Acessibilidade: `aria-label` em cada slide e nos dots
- Respeita `prefers-reduced-motion` (autoplay desabilitado)

**Dependência:** `embla-carousel-autoplay` (peer do `embla-carousel-react` já instalado). Será adicionado ao `package.json`.

### Arquivos alterados
- `src/components/public/PublicHeader.tsx` — reordenar `NAV`
- `src/pages/public/Home.tsx` — substituir bloco HERO por carrossel
- `package.json` — adicionar `embla-carousel-autoplay`

### Não muda
- Tipografia, cores, espaçamentos, demais seções da Home, header (exceto ordem do menu), nada do clube interno.

