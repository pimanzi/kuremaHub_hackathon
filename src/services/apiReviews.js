import supabase from './supabase';

export async function getReviews() {
  const { data, error } = await supabase.from('reviews').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function insertReviews(review) {
  const { data, error } = await supabase
    .from('reviews')
    .insert([
      {
        names: review.names,
        email: review.email,
        comment: review.comment,
        rate: review.rate,
        artId: review.artId,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
