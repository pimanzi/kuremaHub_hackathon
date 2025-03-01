import supabase from './supabase';
export async function getAuthUsers() {
  const { data, error } = await supabase.from('authUsers').select('*');
  if (error) {
    throw new Error(error.message);
  }

  return data;
}
