## Problema
A página `/clube-de-estudos` não carrega porque o Vite falha ao parsear `src/i18n/locales/pt-BR.json` — há conteúdo órfão de merge conflict após o fechamento do objeto `clube` (linha 271), quebrando o JSON inteiro:

```
271:   },
272:       ],
273:       "cta": "Quero entrar no Clube",
...
297:     }
298:   },
299:   "hinos": { ...
```

Erro do Vite: `Failed to parse JSON file ... pt-BR.json:272:6`.

## Correção
Remover as linhas **272–298** (bloco órfão `],` + `cta` + `note` + duplicata de `faq` + `},` extra) para que `"hinos"` na linha 299 fique imediatamente após o `},` que fecha `clube` na linha 271.

Resultado esperado:
```
270:     }
271:   },
272:   "hinos": {
```

## Validação
1. `python3 -c "import json; json.load(open('src/i18n/locales/pt-BR.json'))"` deve passar sem erro.
2. Conferir nos logs do Vite que o erro de JSON desapareceu.
3. Abrir `/clube-de-estudos` no preview e confirmar renderização.

Nenhum outro arquivo é alterado.