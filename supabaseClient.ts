// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zexlxfjlbfesbwsadlob.supabase.co'; // replace with your Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpleGx4ZmpsYmZlc2J3c2FkbG9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyMDA2NDgsImV4cCI6MjA0Njc3NjY0OH0.lcHz-8G1fwkcfH4topa8ZL8l2wM0ZrFbtirQdpuLLaU'; // replace with your anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
