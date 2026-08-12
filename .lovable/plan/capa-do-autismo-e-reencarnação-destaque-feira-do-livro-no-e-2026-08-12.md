# Capa do "Autismo e Reencarnação" + destaque Feira do Livro no "E Putin Reencarnou Ucraniano"

## 1. Nova capa do e-book "Autismo e Reencarnação"
- Enviar a imagem enviada no chat para o storage de capas de e-books e atualizar o registro do e-book para apontar para ela.
- A imagem tem proporção próxima de 2:3, a mesma usada por todas as outras capas do catálogo, então ela aparece no mesmo tamanho e enquadramento dos demais livros (grade, carrossel e página de detalhe) sem ajuste extra.

## 2. Página do e-book "E Putin Reencarnou Ucraniano"
Alterações aplicadas apenas neste livro (identificado pelo seu id), sem afetar os demais:

- **Novo card no lugar de "Comentário do autor"** (o vídeo hoje é só um placeholder nessa página), com texto enxuto:
  - Título: "Dr. Mauro na Feira do Livro de Porto Alegre"
  - Corpo: 72ª Feira do Livro — 30 de outubro a 15 de novembro de 2026, Praça da Alfândega, Centro Histórico. Dr. Mauro estará com um estande.
  - Destaque: 2/11, 14h — Palestra na Sala dos Jacarandás, Clube do Comércio (Andradas, 1085 — 2º andar), com sessão de autógrafos logo após.
  - Visual: card em tom âmbar/dourado suave, com ícone de calendário, alinhado ao estilo dos outros cards da página.

- **Botão principal**: passa de "Comprar" (verde) para **"Comprar na Feira do Livro de Porto Alegre"**, em amarelo/âmbar com texto escuro, sombra e leve destaque, ficando o CTA mais chamativo da página.

- **Ao clicar**: em vez de abrir link externo, abre um pop-up (modal) com a mensagem: "Venha para a Feira do Livro prestigiar esse momento!" seguida das datas (30/10 a 15/11/2026, Praça da Alfândega) e do destaque da palestra + autógrafos em 2/11 às 14h, com botão de fechar.

- Os demais botões da página ("Adquirir Gratuitamente" e o card do Clube) permanecem como estão.

## Detalhes técnicos
- `src/pages/public/LivroDetalhe.tsx`: constante com o id do e-book do Putin; renderização condicional do card da Feira no lugar do bloco de comentário do autor e do CTA amarelo; modal via componente `Dialog` do shadcn já presente no projeto.
- Capa: upload no bucket `ebooks` (pasta `covers`) + update de `cover_url` na tabela `ebooks` para o registro "Autismo e Reencarnação".
