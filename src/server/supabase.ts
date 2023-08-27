import {createClient, type SupabaseClient} from '@supabase/supabase-js';
import {env} from "~/env.mjs";

const globalForSupabase = globalThis as unknown as {
    supabase: SupabaseClient | undefined;
};

export const supabase =
    globalForSupabase.supabase ?? createClient(
        env.SUPABASE_URL,
        env.SUPABASE_SERVICE_ROLE_KEY);
