// E-books temporariamente escondidos das listas públicas (hero da Home,
// página de Livros & E-books e marquee de e-books).
//
// O livro continua salvo no banco de dados e a página dele continua no ar
// pelo link direto. Para trazê-lo de volta, basta esvaziar a lista abaixo
// (ou tirar o id correspondente) — nada mais precisa ser reescrito.

export const PUTIN_EBOOK_ID = '6c60c3e2-087e-437c-899e-cbb2fae624a4';

export const HIDDEN_EBOOK_IDS: string[] = [PUTIN_EBOOK_ID];

export const isHiddenEbook = (id?: string | null): boolean =>
  !!id && HIDDEN_EBOOK_IDS.includes(id);
