## Solução: secret embutido na URL (mais simples)

Em vez de cadastrar o secret no painel da Eduzz, vamos colocá-lo **direto na URL**. A edge function já aceita o secret via query string.

### O que você faz na Eduzz

Use **exatamente esta URL** no campo "URL para envio dos dados":

```
https://khztwxgobacabfvaeves.supabase.co/functions/v1/eduzz-webhook?secret=1eb55366b12998d48991ac5d5143028d4e013a12689a8c3bf3392c3867e5128f
```

E no campo **Secret** pode deixar como `default` mesmo — a Eduzz vai assinar/enviar do jeito padrão dela, e nós vamos ignorar isso e validar pelo `?secret=` da URL.

### O que eu faço no código

Mesmo com o secret correto na URL, o botão **"Verificar URL"** da Eduzz manda um **payload de teste vazio** (sem `event`). Hoje a função processa isso e responde 200, mas pode estar acontecendo um caso onde a Eduzz envia o teste **sem** os parâmetros da URL (alguns sistemas removem query string em "ping"). Vou ajustar `supabase/functions/eduzz-webhook/index.ts` para:

1. **Aceitar GET e POST com body vazio como "ping"** → resposta `200 OK {ok:true, mode:"ping"}`, sem exigir secret e sem gravar no log. Isso garante que o "Verificar URL" da Eduzz sempre passe.
2. **Quando vier um evento real (com `event` no payload):**
   - Validar secret pelos caminhos atuais (header, query, body).
   - Se secret válido → processar normalmente (ativar `paid_customers`, criar usuário, etc).
   - Se secret inválido → ainda retornar **200** (pra Eduzz não desativar o webhook por excesso de erros) e gravar no `eduzz_webhook_log` com `signature_valid=false` pra você revisar no admin.
3. Manter todo o resto do fluxo (PAID_EVENTS, REVOKE_EVENTS, hidratação de `last_paid_at`) inalterado.

### Atualizar o secret no Lovable Cloud

Vou pedir pra você colar o mesmo valor (`1eb55366b12998d48991ac5d5143028d4e013a12689a8c3bf3392c3867e5128f`) no secret `EDUZZ_WEBHOOK_SECRET`. Ele tem que ser **idêntico** ao que está na URL.

## Ordem após aprovação
1. Eu edito o `eduzz-webhook` (ping → 200, deploy automático).
2. Eu peço pra você colar o secret no Lovable.
3. Você cola **a URL completa com `?secret=...`** na Eduzz e clica em "Verificar URL" → deve voltar **200 OK**.
4. Mande um evento de teste; conferimos no `eduzz_webhook_log`.

## Fora do escopo
- Cadastrar secret no painel da Eduzz (não precisa mais).
- Mudar a forma como o webhook hidrata `paid_customers` (continua igual).
