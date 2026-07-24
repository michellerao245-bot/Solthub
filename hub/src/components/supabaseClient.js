import { createClient } from '@supabase/supabase-js';

// .env file se keys utha rahe hain (ye safe tarika hai)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);