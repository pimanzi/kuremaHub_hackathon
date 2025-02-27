import { getArts } from '@/services/apiArts';
import { useQuery } from '@tanstack/react-query';

export function useArts() {
  const {
    data: arts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['arts'],
    queryFn: getArts,
  });

  return { arts, isLoading, refetch };
}
