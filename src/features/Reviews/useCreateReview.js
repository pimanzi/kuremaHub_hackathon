import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { insertReviews } from '@/services/apiReviews';

export function useCreateReview() {
  const queryClient = useQueryClient();
  const { mutate: createReview, isPending: isCreating } = useMutation({
    mutationFn: (review) => insertReviews(review),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success('New review was successfully created');
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createReview };
}
