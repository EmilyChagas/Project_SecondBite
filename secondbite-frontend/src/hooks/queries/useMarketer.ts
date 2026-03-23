import { useQuery } from '@tanstack/react-query';
import { getMarketerById } from '../../services/marketer';

export const useMarketer = (id: string, options?: { enabled: boolean }) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['marketer', id],
    queryFn: () => getMarketerById(id),
    enabled: options?.enabled || !!id,
    staleTime: 1000 * 60 * 60,
  });

  return { data, isPending, isError, error };
};
