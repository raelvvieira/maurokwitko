-- Legacy active users from Eduzz/Nutror migration
CREATE TABLE public.legacy_active_users (
  id uuid primary key default gen_random_uuid(),
  external_id text,
  name text,
  email text unique not null,
  phone text,
  enrollment_status text,
  course_name text,
  enrolled_at timestamptz,
  expires_at timestamptz,
  cancelled_at timestamptz,
  last_access_at timestamptz,
  watched_percentage int default 0,
  imported_at timestamptz not null default now()
);

CREATE INDEX idx_legacy_active_users_email ON public.legacy_active_users(lower(email));

ALTER TABLE public.legacy_active_users ENABLE ROW LEVEL SECURITY;

-- Anyone (even unauthenticated) can check if their email is on the legacy list
-- This is needed for the "first access" password reset flow
CREATE POLICY "Public can check legacy email existence"
ON public.legacy_active_users
FOR SELECT
USING (true);

-- Only service role can insert/update/delete (admin operations done via dashboard or migrations)
CREATE POLICY "Block client writes"
ON public.legacy_active_users
FOR INSERT
TO authenticated
WITH CHECK (false);