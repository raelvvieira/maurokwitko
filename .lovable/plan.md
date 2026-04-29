# Seletor de Idioma com Tradução Completa do Site

Adicionar um botão de bandeira no canto superior direito do site público que, ao ser clicado, abre um popover com as opções **Português (BR)**, **English** e **Español**. Ao escolher um idioma, **todo o site público é traduzido** instantaneamente (textos, menus, botões, títulos, parágrafos), e a preferência fica salva no navegador.

## O que será feito

### 1. Infraestrutura de i18n (internacionalização)
- Instalar **`react-i18next`** + **`i18next`** + **`i18next-browser-languagedetector`** (padrão do mercado React, leve e estável).
- Criar `src/i18n/index.ts` para inicialização com 3 idiomas: `pt-BR` (padrão/fallback), `en`, `es`.
- Criar arquivos de tradução em `src/i18n/locales/`:
  - `pt-BR.json`
  - `en.json`
  - `es.json`
- Persistir o idioma escolhido em `localStorage` (`i18nextLng`) — ao recarregar, o site abre no idioma escolhido.
- Inicializar o i18n em `src/main.tsx` para estar disponível em toda a aplicação.

### 2. Botão seletor com bandeiras (canto superior direito)
- Novo componente: `src/components/public/LanguageSwitcher.tsx`.
- Integrado ao `PublicHeader.tsx`, posicionado **antes do botão "Entrar no Clube"** no desktop e dentro do menu drawer no mobile.
- Visual:
  - Botão circular/pill mostrando a bandeira do idioma atual + sigla (ex.: 🇧🇷 PT) + chevron.
  - Ao clicar, abre um popover (componente `Popover` do shadcn já existente) com as 3 opções, cada uma com bandeira + nome do idioma (estilo similar ao print enviado).
  - Indicador visual de qual idioma está ativo (borda destacada na cor primária `#506274`).
  - Bandeiras renderizadas como **emojis** (🇧🇷 🇺🇸 🇪🇸) — sem dependência de imagens, leve e nítido em qualquer resolução.
- Acessível: `aria-label`, navegação por teclado, fecha ao clicar fora.

### 3. Tradução de todo o site público
Todas as strings visíveis das seguintes páginas/componentes serão extraídas para as chaves de tradução:

**Layout/Navegação:**
- `PublicHeader.tsx` — itens do menu (Home, Quem Sou Eu, Clube de Estudos, Cursos, Livros e E-books, Hinos Espirituais, Rádio, Artigos), submenus, botão "Entrar no Clube", "Menu", "Fechar menu".
- `PublicFooter.tsx` — links, copyright, descrições.

**Páginas públicas (todas em `src/pages/public/`):**
- `Home.tsx` (524 linhas — hero, seções de cursos, livros, hinos, rádio, depoimentos, CTAs).
- `QuemSouEu.tsx` (biografia, formação, missão).
- `Formacao.tsx` (curso de formação, módulos, investimento).
- `CursoOnline.tsx` (curso online, conteúdo programático, CTA).
- `ClubeDeEstudos.tsx` (descrição do clube, benefícios, planos).
- `LivrosEbooks.tsx` + `LivroDetalhe.tsx` (catálogo, sinopses, reviews).
- `Artigos.tsx` + `ArtigoDetalhe.tsx` (lista e detalhe — metadados em UI; conteúdo dos artigos em si fica no idioma original, ver "Limites" abaixo).
- `HinosEspirituais.tsx` (descrição da seção, controles do player).
- `RadioPublica.tsx` (descrição da rádio).

**Componentes:**
- `BookReviews.tsx`, `ExpandableSynopsis.tsx` (botões "Ver mais"/"Ver menos"), `Marquee.tsx` (se houver texto).

### 4. Estrutura das chaves de tradução
Organizadas por escopo para facilitar manutenção, ex.:
```text
{
  "header": { "menu": { "home": "...", "clube": "..." }, "cta": "..." },
  "footer": { "rights": "...", "developedBy": "..." },
  "home": { "hero": { "title": "...", "subtitle": "..." }, ... },
  "quemSouEu": { ... },
  "common": { "readMore": "...", "readLess": "...", "loading": "..." }
}
```

### 5. Limites e observações
- **Conteúdo dinâmico** vindo do banco (artigos, ebooks com sinopse cadastrada pelo admin, hinos, etc.) **não é traduzido automaticamente** — eles permanecem no idioma em que foram cadastrados. Apenas a **UI/navegação/textos estáticos** são traduzidos. Isso é o padrão e o esperado: traduzir conteúdo de banco exigiria salvar versões por idioma no admin (ou usar API de tradução), o que é um projeto separado.
- **Área logada (`/app/*`)**: o pedido fala "todo site" — interpreto como **site público** (que é onde o seletor aparece visualmente). Se quiser traduzir também a área logada do clube, me avise que adiciono o seletor lá e estendo as traduções (é trabalho considerável: dezenas de páginas adicionais).
- **E-mails transacionais**: continuam em português (são disparados do backend baseados em status de pagamento, não na preferência de UI).
- O idioma padrão continua **Português (Brasil)** para novos visitantes.

## Detalhes técnicos

- Pacotes: `i18next`, `react-i18next`, `i18next-browser-languagedetector`.
- Detecção de idioma: ordem `localStorage → navigator → fallback (pt-BR)`.
- Hook usado nas páginas: `const { t } = useTranslation();` → `t('home.hero.title')`.
- `<html lang>` atualizado dinamicamente via `useEffect` no `LanguageSwitcher` para SEO/acessibilidade.
- Sem mudanças no roteamento (URLs continuam as mesmas — não vamos prefixar com `/en/`, `/es/` para manter simples e preservar SEO atual).

## Resultado final
Visitante vê uma bandeirinha no header → clica → escolhe idioma → site inteiro (público) muda na hora, sem reload, com a escolha lembrada para próximas visitas.
