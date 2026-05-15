ALTER TABLE public.paid_customers
  ADD COLUMN IF NOT EXISTS welcome_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS overdue_notified_at timestamptz;

CREATE TABLE IF NOT EXISTS public.eduzz_cart_recovery (
  email text PRIMARY KEY,
  last_sent_at timestamptz NOT NULL DEFAULT now(),
  attempts integer NOT NULL DEFAULT 1
);

ALTER TABLE public.eduzz_cart_recovery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages cart recovery"
  ON public.eduzz_cart_recovery
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');