CREATE TABLE IF NOT EXISTS public.access_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  note text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_access_requests_email_lower ON public.access_requests (lower(email));
CREATE INDEX IF NOT EXISTS idx_access_requests_created_at ON public.access_requests (created_at DESC);

ALTER TABLE public.access_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit access requests" ON public.access_requests;
CREATE POLICY "Anyone can submit access requests"
ON public.access_requests
FOR INSERT
TO public
WITH CHECK (char_length(email) BETWEEN 3 AND 200);

DROP POLICY IF EXISTS "Admins can read access requests" ON public.access_requests;
CREATE POLICY "Admins can read access requests"
ON public.access_requests
FOR SELECT
TO authenticated
USING (lower(auth.email()) = ANY (ARRAY['mauroabpr@gmail.com','raelvvieira@gmail.com']));

DROP POLICY IF EXISTS "Admins can update access requests" ON public.access_requests;
CREATE POLICY "Admins can update access requests"
ON public.access_requests
FOR UPDATE
TO authenticated
USING (lower(auth.email()) = ANY (ARRAY['mauroabpr@gmail.com','raelvvieira@gmail.com']))
WITH CHECK (lower(auth.email()) = ANY (ARRAY['mauroabpr@gmail.com','raelvvieira@gmail.com']));

DROP POLICY IF EXISTS "Admins can delete access requests" ON public.access_requests;
CREATE POLICY "Admins can delete access requests"
ON public.access_requests
FOR DELETE
TO authenticated
USING (lower(auth.email()) = ANY (ARRAY['mauroabpr@gmail.com','raelvvieira@gmail.com']));