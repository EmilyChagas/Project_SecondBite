import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '../../services/orders';

export const useOrder = (id: string) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['orders', id],
    queryFn: () => getOrderById(id),
    enabled: !!id,
  });

  return { data, isPending, isError, error };
};
