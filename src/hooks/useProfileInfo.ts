import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

/**
 * Resolves the real display name for the currently logged-in user.
 * Priority:
 *   1. user_metadata.name (set when the user edits their profile)
 *   2. paid_customers.name (matched by email)
 *   3. legacy_active_users.name (matched by email)
 *   4. local part of the email (before "@")
 */
export function useProfileInfo() {
  const { user } = useAuth();
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const email = user?.email ?? '';

  useEffect(() => {
    let cancelled = false;

    async function resolve() {
      if (!email) {
        setName('');
        return;
      }

      // 1. user metadata
      const metaName = (user?.user_metadata as any)?.name as string | undefined;
      if (metaName && metaName.trim().length > 0) {
        if (!cancelled) setName(metaName.trim());
        return;
      }

      setLoading(true);

      // 2. paid_customers
      const { data: paid } = await supabase
        .from('paid_customers')
        .select('name')
        .eq('email', email.toLowerCase())
        .maybeSingle();

      if (!cancelled && paid?.name) {
        setName(paid.name);
        setLoading(false);
        return;
      }

      // 3. legacy_active_users
      const { data: legacy } = await supabase
        .from('legacy_active_users')
        .select('name')
        .eq('email', email.toLowerCase())
        .maybeSingle();

      if (!cancelled && legacy?.name) {
        setName(legacy.name);
        setLoading(false);
        return;
      }

      // 4. fallback: local part of email
      if (!cancelled) {
        setName(email.split('@')[0] ?? '');
        setLoading(false);
      }
    }

    resolve();
    return () => {
      cancelled = true;
    };
  }, [email, user]);

  return { name, email, loading };
}
