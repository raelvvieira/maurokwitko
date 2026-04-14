

## Plano: Adicionar E-books PDF com capas na plataforma

### Contexto
O ZIP contém PDFs cujos nomes de arquivo sao os titulos. A tabela `ebooks` atual tem campos `title`, `author`, `description`, `pages`, `url` mas nenhum campo para imagem de capa. Os 2 registros existentes sao placeholders.

### Etapas

#### 1. Criar bucket de storage `ebooks`
Migration SQL para criar um bucket publico `ebooks` com policy de leitura publica. Subpastas: `pdfs/` para os arquivos e `covers/` para as capas.

#### 2. Adicionar coluna `cover_url` na tabela `ebooks`
Migration para adicionar `cover_url TEXT DEFAULT NULL` a tabela ebooks.

#### 3. Extrair, processar e fazer upload dos PDFs
- Descompactar o ZIP
- Para cada PDF: extrair a primeira pagina como imagem JPG (usando `pdftoppm`)
- Fazer upload de cada PDF e sua capa para o bucket `ebooks` via Supabase Storage
- Gerar URLs publicas

#### 4. Limpar dados antigos e inserir os novos
- Deletar os 2 registros placeholder existentes
- Inserir um registro por PDF com: titulo (nome do arquivo sem .pdf), author = "Dr. Mauro Kwitko", url = URL publica do PDF, cover_url = URL publica da imagem da capa

#### 5. Atualizar `Ebooks.tsx` para exibir a capa
Trocar o placeholder gradient+icone pela imagem real da capa:
```
<img src={book.cover_url} className="w-full aspect-[3/4] rounded-xl object-cover" />
```
Com fallback para o icone caso nao tenha capa.

#### 6. Atualizar types/hooks
Adicionar `cover_url` ao `BookRow` interface em `useSupabaseData.ts`.

### Detalhes tecnicos
- Bucket criado via migration SQL em `storage.buckets` + policies em `storage.objects`
- Upload dos arquivos via script Python/shell usando a API REST do Supabase com service role key
- Capas geradas com `pdftoppm` (ja disponivel no sandbox)
- Coluna `cover_url` nullable para manter compatibilidade com registros sem capa

