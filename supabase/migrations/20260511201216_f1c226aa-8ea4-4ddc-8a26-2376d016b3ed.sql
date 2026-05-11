ALTER TABLE public.paid_customers ADD COLUMN IF NOT EXISTS last_paid_at timestamptz;

UPDATE public.paid_customers
SET last_paid_at = COALESCE(first_paid_at, updated_at)
WHERE last_paid_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_paid_customers_email_lower ON public.paid_customers (lower(email));
CREATE INDEX IF NOT EXISTS idx_paid_customers_last_paid_at ON public.paid_customers (last_paid_at);

-- Helpful index to scan webhook log by email quickly (jsonb path)
CREATE INDEX IF NOT EXISTS idx_eduzz_webhook_log_processed_at ON public.eduzz_webhook_log (processed_at DESC);