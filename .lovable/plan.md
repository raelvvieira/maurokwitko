

## Plano: Site institucional Dr. Mauro Kwitko (Home)

Criar um site institucional **público** (sem login obrigatório) inspirado na referência do Stitch, mantendo o Clube de Estudos atual intacto e acessível via botão "Login" no canto superior direito.

### Arquitetura de rotas

Reestruturar `App.tsx` para separar **rotas públicas** (site institucional) de **rotas privadas** (clube):

```text
PÚBLICAS (sem login):
  /                      → Home institucional (NOVA)
  /sobre                 → (futuro)
  /cursos-publico        → (futuro)
  /livros-publico        → (futuro)
  /hinos-publico         → (futuro)
  /artigos               → (futuro)
  /login                 → Tela de login do clube
  /reset-password        → (já existe)

PRIVADAS (clube — exigem login):
  /app                   → Dashboard
  /app/courses           → Cursos
  /app/livros, /app/library, etc.
  (todas as rotas atuais migram para o prefixo /app)
```

Após login bem-sucedido, redireciona para `/app`. O link "Login" no header público leva a `/login`. O botão "Sair" no clube volta para `/`.

### Home institucional — seções (esta entrega)

Layout single-page com header fixo + 6 seções:

1. **Header transparente fixo**
   - Esquerda: logo + "Dr. Mauro Kwitko"
   - Centro: nav (Home, Cursos, Livros, Hinos, Artigos) — links âncora ou placeholders nas próximas entregas
   - Direita: botão "Entrar no Clube" (estilo primário, leva a `/login`)

2. **Hero**
   - Tag pequena: "30+ ANOS DE EXCELÊNCIA CLÍNICA"
   - Título grande: "Ciência e **Despertar Espiritual**" (palavra "Despertar Espiritual" em itálico/destaque slate)
   - Subtítulo: bio curta sobre integrar Psicoterapia de Regressão à psicologia clínica
   - 2 botões: "Conheça o Método" (primário) + "Pesquisas Recentes" (secundário)
   - À direita: foto de perfil em moldura arredondada com sombra suave (https://i.ibb.co/MDn6WZRV/DR-MAURO-1.png)

3. **Citação destacada**
   - Bloco centralizado com aspas + frase: *"Curar não é apenas a ausência de sintomas, mas a presença de sentido encontrado na jornada da alma através do tempo."*
   - Atribuição: "— DR. MAURO KWITKO"

4. **Card "Curso de Formação em Psicoterapia Reencarnacionista"**
   - Card escuro (slate `#1a2530`) destacado, com tag "INSCRIÇÕES ABERTAS"
   - Título + descrição do curso
   - 3 bullets com check: "Técnicas Avançadas de Regressão", "Anatomia Espiritual & Karma", "Casos Clínicos & Supervisão"
   - Botão "Entrar para a Lista de Espera"
   - Imagem ilustrativa à direita (placeholder cósmico via gradiente, sem dependência externa)

5. **Últimas Publicações**
   - Título "Últimas Publicações" + link "Ver Bibliografia Completa →"
   - Grid de 3 livros usando os dados reais de `BOOKS` em `src/pages/Livros.tsx` (capas BesouroBox)
   - Cada card: capa grande + título + "Saiba Mais →" (link para a página do livro na BesouroBox)

6. **A Sabedoria da Experiência (bio)**
   - Mosaico 2x2 à esquerda com fotos: ABPR (https://i.ibb.co/358FCytk/DR-MAURO-2.jpg), foto palestrando, e dois placeholders neutros (consultório/livros)
   - À direita: título "A Sabedoria da Experiência" + 2 parágrafos de bio + 2 stats grandes ("15k+ Horas Clínicas" / "12 Livros Publicados")
   - Link "Conheça mais sobre sua trajetória →"

7. **Artigos Recentes**
   - 3 cards com placeholder de imagem + categoria + data + título + "Ler artigo →"
   - Conteúdo placeholder (nesta entrega são estáticos; integraremos com a tabela de blog em entrega futura)

8. **Footer escuro**
   - Coluna 1: marca + tagline
   - Coluna 2: Navegação (links do menu)
   - Coluna 3: Horários do consultório
   - Coluna 4: Newsletter (input + botão verde "Inscrever-se") — visual apenas nesta entrega
   - Linha inferior: copyright + redes sociais

### Design system

- **Reaproveita** tokens do clube (slate `#506274`, glassmorphism, fontes Plus Jakarta Sans / Inter) para coerência visual.
- **Diferencia** do app interno: layout largo (max-w-6xl), respiração maior, sem sidebar, header fixo translúcido com blur ao scroll.
- **Acento verde** (`hsl(142 71% 45%)` já presente como `--success`) para CTAs principais (alinhado ao verde da referência sem destoar da paleta slate).
- Tipografia: títulos em peso 700-800 com tracking apertado; corpo em 400-500 com leading generoso.

### Arquivos

**Novos:**
- `src/pages/public/Home.tsx` — página institucional completa
- `src/components/public/PublicHeader.tsx` — header fixo com nav e botão Login
- `src/components/public/PublicFooter.tsx` — footer escuro
- `src/components/public/PublicLayout.tsx` — wrapper com header + outlet + footer (para futuras páginas públicas)

**Alterados:**
- `src/App.tsx` — separar rotas públicas/privadas, mover clube para prefixo `/app`, adicionar `/login` como rota pública dedicada
- `src/components/GlassSidebar.tsx` e qualquer `<Link to="/">` interno do clube — apontar para `/app`
- `src/pages/Login.tsx` — após login redirecionar para `/app` (em vez de `/`); adicionar link "← Voltar ao site" no topo
- `src/components/AppShell.tsx` — botão "Sair" leva para `/` após signOut

### Detalhes técnicos

- Imagens do Mauro consumidas direto das URLs i.ibb.co fornecidas (sem download para o repo nesta etapa).
- Capas dos livros: import da constante `BOOKS` do `Livros.tsx` (ou extração para `src/data/books.ts` compartilhado entre clube e site).
- Animações sutis com framer-motion (já instalado): fade-up nas seções ao entrar no viewport.
- Responsivo: hero empilha no mobile (foto acima do texto), grids reduzem colunas, header vira hamburger no `md:hidden`.
- SEO básico: `<title>` e `<meta description>` via `index.html` ajustados para "Dr. Mauro Kwitko — Psicoterapia de Regressão".
- Sem mudanças no Supabase nesta entrega.

### Próximas entregas (não nesta)

Páginas Sobre, Cursos público, Livros público, Hinos público (preview de álbuns), Artigos (lista pública do blog) — cada uma em conversa separada conforme você pediu.

