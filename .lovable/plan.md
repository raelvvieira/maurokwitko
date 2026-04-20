

## Plano: Home institucional v2 + Menu superior expandido

Reescrever a Home pública incorporando a copy original do site atual (em versão refinada), acrescentando carrosséis de livros/e-books animados, galeria visual com as fotos enviadas, e expandir o menu superior com submenu em "Cursos" + novos itens "Quem Sou Eu" e "Grupos de Apoio".

### 1. Header — novo menu superior

Substituir os links âncora atuais por uma navegação que reflete a estrutura do site original:

```text
Quem Sou Eu          → âncora #quem-sou-eu
Cursos ▾             → DROPDOWN com 2 itens (sem páginas dedicadas ainda):
                         • Formação em Psicoterapia Reencarnacionista (#formacao)
                         • Curso On-line: A Psicologia da Reencarnação (#curso-online)
Livros e E-books     → âncora #livros
Hinos Espirituais    → âncora #hinos
Grupos de Apoio      → âncora #grupos
Artigos              → âncora #artigos
```

- Botão "Entrar no Clube" mantido à direita.
- Submenu desktop: dropdown leve (hover/click) com transição fade — usando estado local + Framer Motion (sem dependência nova).
- Mobile: drawer lateral mostra "Cursos" expansível (accordion) com os mesmos 2 sub-itens.
- Os dois sub-itens de Cursos são apenas âncoras/links visuais nesta entrega (não criamos páginas dedicadas).

### 2. Home — nova estrutura de seções

```text
1. Hero (mantido, com leve refinamento da copy)
2. Quem Sou Eu (NOVO — bio expandida do site original)
3. Bibliografia: Livros (CARROSSEL infinito automático lento)
4. E-books do Clube (CARROSSEL infinito — capas reais via useEbooks)
5. Formação em Psicoterapia Reencarnacionista (card destaque escuro)
6. Hinos Espirituais (NOVO — card duplo com capas dos hinários)
7. Grupos de Apoio (NOVO — card simples convidando ao contato)
8. Galeria (NOVO — mosaico com fotos enviadas: AULAS TEÓRICAS, AULAS PRÁTICAS, ENCONTRO ABPR, TURMA, EVOLUÇÃO CONSCIENCIAL)
9. Citação destacada (mantida)
10. Artigos Recentes (mantido)
11. Contato (NOVO — bloco simples com CTA WhatsApp/e-mail)
```

**Observação:** o card "Curso On-line: A Psicologia da Reencarnação" foi REMOVIDO conforme pedido.

### 3. Detalhes por seção nova/revisada

**Quem Sou Eu (#quem-sou-eu)** — substitui a antiga seção "Sabedoria da Experiência":
- Foto principal (DR-MAURO-1) + título "Olá, sou Dr. Mauro" 
- Texto: "Há cerca de 30 anos venho me dedicando a orientar pessoas, no consultório, nas palestras e nos cursos, a recordarem que somos Espíritos encarnados com finalidades próprias a cada um."
- Lista de credenciais com ícones check:
  - Fundador e patrono da Associação Brasileira de Psicoterapia Reencarnacionista (ABPR)
  - Mais de 20.000 Investigações do Inconsciente (Regressões) realizadas
  - Mais de 60 turmas formadas no Curso de Psicoterapia Reencarnacionista
  - 19 livros publicados (físicos e e-books)
- Stats grandes mantidos (20k+ Atendimentos / 19 Livros / 60+ Turmas)

**Carrossel de Livros (#livros)** — auto-scroll horizontal infinito:
- Trilha duplicada com `motion.div` animando `x` em loop linear (~40s, pausa no hover).
- Mostra TODOS os 5 livros de `BOOKS` repetidos para efeito infinito.
- Cards menores (w-44/w-52), capa + título, link externo BesouroBox.
- Header da seção: "Aprenda Com Meus Livros" + link "Ver bibliografia completa".

**Carrossel de E-books** (linha separada logo abaixo):
- Mesma mecânica de auto-scroll, puxando capas via `useEbooks()`.
- Como `useEbooks` requer Supabase (e a Home é pública), usamos um fetch direto e silencioso: `supabase.from('ebooks').select('id,title,cover_url').limit(20)` — capas/títulos são públicos. Se vazio, oculta a faixa.
- Cards apontam para `/login` com aviso "Disponível no Clube" no hover.

**Hinos Espirituais (#hinos)**:
- Bloco com 2 capas grandes: HINOS DE AMOR e HINOS DE FÉ (URLs fornecidas).
- Texto: "Mensagens espirituais vindas do Astral para lembrarmos que somos gotas de luz aqui na Terra."
- CTA "Ouvir no Clube" → `/login`.

**Grupos de Apoio (#grupos)**:
- Card simples com ícone + texto curto: "Encontros de estudo e troca entre praticantes da Psicoterapia Reencarnacionista."
- Botão "Entre em contato" (link `mailto:` ou WhatsApp — placeholder).

**Galeria visual** (entre Grupos e Citação):
- Mosaico 3 colunas no desktop / 2 no mobile com 6 imagens fornecidas (AULAS TEÓRICAS, AULAS PRÁTICAS, DR-MAURO-2, DR-MAURO-CURSO-DE-FORMAÇÃO, ENCONTRO-NACIONAL-ABPR, TURMA-CURSO-FORMACAO, EVOLUCAO-CONSCIENCIAL).
- Hover sutil com zoom + overlay com legenda.

**Contato (final, antes do footer)**:
- "Entre em contato comigo. Vamos conversar!"
- Botão grande "Enviar mensagem" → âncora ou `mailto:`.

### 4. Implementação técnica do carrossel infinito

Componente `<MarqueeRow items={...} renderItem={...} duration={40} />`:
- Container `overflow-hidden`.
- Trilha = `[...items, ...items]` em flex, animada com `motion.div` `animate={{ x: ['0%', '-50%'] }}` em loop linear.
- `whileHover` para pausar (via state ou `animationPlayState`).
- Reutilizado para livros e e-books.

### 5. Arquivos

**Novos:**
- `src/components/public/Marquee.tsx` — carrossel infinito reutilizável.
- `src/components/public/CoursesDropdown.tsx` — dropdown desktop "Cursos" (e accordion equivalente no drawer mobile).

**Alterados:**
- `src/components/public/PublicHeader.tsx` — nova nav (Quem Sou Eu, Cursos▾, Livros e E-books, Hinos Espirituais, Grupos de Apoio, Artigos), drawer mobile com Cursos expansível.
- `src/pages/public/Home.tsx` — reestruturação completa conforme seções acima; remoção do card "Curso On-line"; adição de Marquees, galeria, hinos, grupos, contato; copy refinada do site original.

**Sem mudanças:** rotas, Supabase, footer (mantém o atual), PublicLayout.

### 6. Notas

- Imagens do Mauro e capas de hinários consumidas via URLs i.ibb.co.
- E-books reais puxados publicamente do Supabase (`ebooks.cover_url` já é URL pública do bucket).
- Animações suaves (Framer Motion já presente). Sem novas dependências.
- Responsivo: marquees viram 1 linha no mobile, galeria 2 colunas, dropdown vira accordion.
- Sem mudanças no Clube (`/app/*`).

