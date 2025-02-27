import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://fyzypjerwxdljlptouot.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5enlwamVyd3hkbGpscHRvdW90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxNzkzNTYsImV4cCI6MjA0Nzc1NTM1Nn0.qdSfmjqZM54hT7qYr9zboDqQUe0R5xpk9rkGUK4tzJk';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
