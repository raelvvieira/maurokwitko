## Card Amazon entre Livros Físicos e E-books

Arquivo: `src/pages/public/LivrosEbooks.tsx`

Replicar a estrutura do card "Spotify" de `HinosEspirituais.tsx`, adaptado para a Amazon e inserido entre as seções **Livros Físicos** (termina na linha 89) e **E-books** (começa na linha 91).

### Mudanças
1. Importar `ExternalLink` de `lucide-react` (junto com `BookOpen, ArrowRight` já existentes).
2. Inserir uma nova `<section>` logo após o fechamento da seção de Livros Físicos contendo:
   - Container `max-w-5xl mx-auto rounded-3xl` com gradiente nas cores Amazon: `from-[#232F3E] via-[#2a3645] to-[#131A22]` (navy escuro), `ring-1 ring-[#FF9900]/30` (sutil contorno laranja).
   - Layout flex (coluna no mobile, linha no desktop) com 3 blocos:
     - **Ícone**: círculo branco 80x80 com o **logo SVG da Amazon** (smile laranja `#FF9900` + wordmark "amazon" branco) inline.
     - **Texto**: título "Prefere comprar pela Amazon?" + descrição explicando que os e-books podem ser adquiridos e lidos fora do Clube de Estudos, direto no Kindle/app Amazon.
     - **CTA**: botão pílula `bg-[#FF9900]` com texto escuro `#131A22`, label "Ver na Amazon" + ícone `ExternalLink`, link para a URL fornecida (`https://www.amazon.com.br/s?k=Dr.+Mauro+Kwitko...`), `target="_blank"`.
   - Animação de entrada via `{...fadeUp}` (já definido no arquivo).

Sem alterações em outras seções, dados ou rotas.
