import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useArts } from './useArts';
import { insertArt } from '@/services/apiArts';

export function useCreateArt() {
  const { refetch } = useArts();
  const queryClient = useQueryClient();

  const { mutate: createArt, isPending: isCreating } = useMutation({
    mutationFn: (art) => insertArt(art),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['arts', 'recentArts'] });
      refetch();
      toast.success(t('toastSuccessArtCreation'));
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { isCreating, createArt };
}
