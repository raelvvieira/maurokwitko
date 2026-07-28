WITH paid AS (
  SELECT DISTINCT ON (lower(payload->'data'->'buyer'->>'email'))
    lower(payload->'data'->'buyer'->>'email') AS email,
    payload->'data'->'buyer'->>'name' AS name,
    payload->'data'->'buyer'->>'cellphone' AS phone,
    payload->'data'->'buyer'->>'id' AS buyer_id,
    payload->'data'->>'id' AS invoice_id,
    processed_at
  FROM eduzz_webhook_log
  WHERE event IN ('myeduzz.invoice_paid','invoice_paid')
    AND processed_at > now() - interval '45 days'
    AND payload->'data'->'buyer'->>'email' IS NOT NULL
  ORDER BY 1, processed_at DESC
)
INSERT INTO public.paid_customers (email, name, phone, eduzz_buyer_id, last_invoice_id, status, first_paid_at, last_paid_at, revoked_at, revoked_reason, overdue_notified_at, welcome_sent_at)
SELECT email, name, phone, buyer_id, invoice_id, 'active', processed_at, processed_at, NULL, NULL, NULL, processed_at
FROM paid
ON CONFLICT (email) DO UPDATE SET
  status = 'active',
  name = COALESCE(paid_customers.name, EXCLUDED.name),
  phone = COALESCE(paid_customers.phone, EXCLUDED.phone),
  eduzz_buyer_id = COALESCE(paid_customers.eduzz_buyer_id, EXCLUDED.eduzz_buyer_id),
  last_invoice_id = EXCLUDED.last_invoice_id,
  last_paid_at = GREATEST(COALESCE(paid_customers.last_paid_at, EXCLUDED.last_paid_at), EXCLUDED.last_paid_at),
  first_paid_at = LEAST(COALESCE(paid_customers.first_paid_at, EXCLUDED.first_paid_at), EXCLUDED.first_paid_at),
  revoked_at = NULL,
  revoked_reason = NULL,
  overdue_notified_at = NULL,
  welcome_sent_at = COALESCE(paid_customers.welcome_sent_at, EXCLUDED.welcome_sent_at);