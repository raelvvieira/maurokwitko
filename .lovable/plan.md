

## Plano: Página Quem Sou Eu, Página Curso de Formação e ajuste dos carrosséis

### 1. Novas páginas públicas

Criar duas páginas públicas dedicadas (dentro do `PublicLayout` — header + footer institucionais), e mudar os links âncora do header em links de rota.

**Rotas adicionadas em `App.tsx`:**
```text
/quem-sou-eu  → src/pages/public/QuemSouEu.tsx
/formacao     → src/pages/public/Formacao.tsx
```

### 2. Página `/quem-sou-eu` — Quem é Mauro Kwitko

Estrutura em seções, mantendo o design system (slate, glassmorphism leve, fontes do clube):

1. **Hero da página**
   - Tag: "Quem Sou Eu"
   - Título grande: "Quem é **Dr. Mauro Kwitko**"
   - Foto grande à direita: `https://i.ibb.co/MDn6WZRV/DR-MAURO-1.png`

2. **O Começo**
   - Título "O Começo" + parágrafos da copy fornecida (consultório em Porto Alegre, médico homeopata, inspiração do Mundo Espiritual, nascimento da Psicoterapia Reencarnacionista e da Investigação do Inconsciente).

3. **Meus Valores**
   - 4 cards minimalistas com ícones:
     - Fusão entre Psicologia, Psiquiatria e Reencarnação
     - Ajudar as pessoas a aproveitarem a sua encarnação
     - Semear o bem no mundo
     - Relembrar a todos que somos irmãos

4. **A ABPR**
   - Título + parágrafos da copy (criação em 10/08/2004, expansão, 28 ministrantes, 17 estados, centenas de psicoterapeutas formados).
   - Imagem ao lado: `https://i.ibb.co/ksCJ5Jbw/ENCONTRO-NACIONAL-DA-ABPR.jpg`

5. **Psicoterapia Reencarnacionista — O que é**
   - Bloco textual com a definição completa da escola (Reencarnação, continuidade da personalidade, Reforma Íntima, Todo/Deus e micro-manifestação).
   - Imagem auxiliar: `https://i.ibb.co/358FCytk/DR-MAURO-2.jpg`

6. **Mais sobre minha carreira**
   - Texto da copy (formação UFRGS 1971, dedicação desde 1996, fundador/patrono/Diretor de Ensino da ABPR, escritor russo em vida anterior, 19 livros com lista de títulos).
   - Lista visual destacada dos livros mencionados ("A Terapia da Reforma Íntima", "Como Aproveitar a Sua Encarnação", "Doutor, eu ouço vozes!", "Como Evoluir Espiritualmente em um Mundo de Drogas", "Jovens Guerreiros e Guerreiras da Luz", "Como Matar o Pensamento Suicida", "A Força Espiritual").

7. **CTA final** — botão "Entrar no Clube de Estudos" → `/login`.

### 3. Página `/formacao` — Curso de Formação em Psicoterapia Reencarnacionista

Estrutura:

1. **Hero** — Tag "Curso de Formação" + título grande "Curso de Formação em **Psicoterapia Reencarnacionista**" + foto `https://i.ibb.co/bjyq508N/DR-MAURO-CURSO-DE-FORMA-O.jpg`.

2. **O que é** — Parágrafo introdutório + lista com 5 bullets:
   - Infância, continuação da vida passada
   - A finalidade e o aproveitamento da encarnação
   - As armadilhas e os gatilhos terrenos como ferramentas de evolução
   - Como promover a nossa Reforma Íntima
   - O que é o Livre Arbítrio

3. **Conteúdo do Curso** — 3 colunas (cards) com ícones:
   - **Aulas Teóricas**: O que é a Psicoterapia Reencarnacionista, Investigação do Inconsciente, níveis do ego, Ilusão dos Rótulos das Cascas (Maya), Todo e micro-manifestações. Imagem topo: AULAS TEÓRICAS.
   - **Aulas Práticas**: Grupos de Prática, Simulação de Plano Astral, gotinhas do Mar, Encontro consigo mesmo, rodadas de inferioridades e virtudes. Imagem topo: AULAS PRÁTICAS.
   - **Evolução Consciencial**: Personalidade Congênita, Programação para a encarnação, Livre-Arbítrio pré e durante encarnação, libertar-se de si mesmo, ego ancião. Imagem topo: EVOLUÇÃO CONSCIENCIAL.

4. **CTA "Quero baixar o programa completo!"** — botão destacado (`mailto:` placeholder).

5. **Critérios para Inscrição** — Bloco com texto + 5 cards/categorias:
   - Profissional da Saúde Oficial (médicos, psiquiatras, psicólogos…)
   - Profissional da Saúde Alternativa (terapeutas florais, reikianos…)
   - Realizando cursos na área da saúde
   - Trabalhadores de Instituições Religiosas (médiuns)
   - Profissional da Educação (professores, pedagogos…)

6. **Tenho interesse, como me inscrever?** — Texto da copy + grid de 4 botões CTA (turmas):
   - Turma do Rio de Janeiro — Abril 2026
   - Turma de Porto Alegre — Abril 2026
   - Turma do Ceará — 2026
   - Turma do Sergipe — 2026
   - Cada botão é placeholder (`#` ou `mailto:`); links reais ficam para próxima entrega.

### 4. Header — atualizar links

Em `PublicHeader.tsx`, trocar âncoras por rotas reais:
- "Quem Sou Eu" → `/quem-sou-eu` (usar `<Link>` do react-router; quando estiver em `/`, ainda funciona).
- "Cursos > Formação em Psicoterapia Reencarnacionista" → `/formacao`.
- "Cursos > Curso On-line: A Psicologia da Reencarnação" → mantém âncora `#curso-online` (sem página dedicada agora, mas item segue removido da Home — pode virar `mailto:` ou `#`).
- "Livros e E-books" → continua `/#livros` (âncora na Home; ao estar em outra rota, navega para `/` e rola).
- "Artigos" → `/#artigos`.

Itens com âncora absoluta serão ajustados para usar `<Link to="/#livros">` e similar, garantindo navegação cross-page.

### 5. Carrosséis (Marquee) — limite visível + scroll por toque

Em `src/components/public/Marquee.tsx`:

- **Largura visível controlada**: container externo com `max-w-[1320px] mx-auto` (suficiente para 6 cards de 200px + gaps no desktop). No mobile, viewport natural.
- **Scroll por toque/dedos**: adicionar `overflow-x-auto` + `touch-pan-x` + `overscroll-x-contain` num wrapper, mantendo a animação infinita por padrão. Quando o usuário tocar/arrastar, pausar a animação (já temos `paused`); estender para também pausar em `onTouchStart` e retomar em `onTouchEnd` após delay, e habilitar scroll manual nesse intervalo.
- Esconder scrollbar com utilitário (`scrollbar-hide` via classe utilitária no `index.css` se ainda não existir; senão `[&::-webkit-scrollbar]:hidden`).
- Manter cards com tamanho atual (`200x300` desktop / `160x240` mobile) — sem alteração visual nos cards.

Resultado: até ~6 capas visíveis simultaneamente no desktop dentro do container limitado, e o usuário pode arrastar com o dedo no mobile/trackpad.

### 6. Arquivos

**Novos:**
- `src/pages/public/QuemSouEu.tsx`
- `src/pages/public/Formacao.tsx`

**Alterados:**
- `src/App.tsx` — registrar `/quem-sou-eu` e `/formacao` dentro do bloco `<Route element={<PublicLayout />}>`.
- `src/components/public/PublicHeader.tsx` — trocar âncoras por rotas onde aplicável; usar `Link` do react-router.
- `src/components/public/Marquee.tsx` — wrapper com max-width e habilitar drag/scroll por toque + ocultar scrollbar.
- `src/index.css` — pequena utility `.scrollbar-hide` (caso necessária).

**Sem mudanças:** Supabase, Clube (`/app/*`), footer.

