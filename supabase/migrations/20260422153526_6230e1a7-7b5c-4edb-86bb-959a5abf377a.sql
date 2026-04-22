-- paid_customers
CREATE TABLE public.paid_customers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  name text,
  phone text,
  eduzz_buyer_id text,
  last_invoice_id text,
  status text NOT NULL DEFAULT 'active',
  first_paid_at timestamptz,
  revoked_at timestamptz,
  revoked_reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_paid_customers_email ON public.paid_customers(lower(email));

ALTER TABLE public.paid_customers ENABLE ROW LEVEL SECURITY;

-- Service role implicit; only allow authenticated user to read own record by email
CREATE POLICY "Users can view their own paid record"
ON public.paid_customers
FOR SELECT
TO authenticated
USING (lower(email) = lower(auth.email()));

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_paid_customers_updated_at
BEFORE UPDATE ON public.paid_customers
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- eduzz_webhook_log
CREATE TABLE public.eduzz_webhook_log (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event text,
  event_id text,
  payload jsonb NOT NULL,
  signature_valid boolean NOT NULL DEFAULT false,
  processed_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.eduzz_webhook_log ENABLE ROW LEVEL SECURITY;
-- No policies = only service role can access