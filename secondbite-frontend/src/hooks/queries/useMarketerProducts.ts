import { useQuery } from '@tanstack/react-query';
import { getProductsByMarketer } from '../../services/products';

export const useMarketerProducts = (id: string) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['marketer-products', id],
    queryFn: () => getProductsByMarketer(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  });

  return { data, isPending, isError, error };
};
