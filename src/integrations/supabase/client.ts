// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wlwqhrurysngmnaexexs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indsd3FocnVyeXNuZ21uYWV4ZXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1NTQ4NTUsImV4cCI6MjA1ODEzMDg1NX0.9Z9ZJbYOtauSWLSK8UPUUKPQvGmLzZHydCvrgLn2Kc0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);