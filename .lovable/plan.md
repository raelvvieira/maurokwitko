## Problema

A página `/clube-de-estudos` (e todo o site público) não carrega porque o Vite falha ao importar `src/i18n/locales/pt-BR.json`:

```
[vite] Internal server error: Failed to parse JSON file, invalid JSON syntax found at position 12000
File: /dev-server/src/i18n/locales/pt-BR.json:272:6
```

Sem o JSON do i18n, o bundle quebra e o preview cai no fallback de login do Lovable (foi o que você está vendo no lugar da página).

## Causa

O bloco `clube` termina corretamente na linha 271 (`}`), mas existe um trecho órfão (sobra de merge) entre as linhas 272 e 298 — `],`, `"cta"`, `"note"`, um segundo `"faq"` completo e um `},` extra — antes do bloco `"hinos"` na linha 299. Isso quebra a sintaxe JSON.

## Correção

Editar apenas `src/i18n/locales/pt-BR.json`:

- Trocar a linha 271 de `}` para `},`
- Remover as linhas 272–298 (todo o conteúdo órfão até o `},` extra, exclusive a chave `"hinos"`)

Resultado: depois de fechar `clube` com `},`, o arquivo segue direto para `"hinos": { ... }` na linha seguinte.

Nenhuma outra alteração de código, conteúdo, tradução ou layout.

## Verificação

- Conferir nos logs do Vite que o erro `Failed to parse JSON` desapareceu
- Abrir `/clube-de-estudos` no preview e confirmar que a página renderiza normalmente
