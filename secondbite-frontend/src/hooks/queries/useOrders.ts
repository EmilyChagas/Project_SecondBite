import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../../services/orders';
import type { OrderStatus } from '../../interfaces/orders';

export const useOrders = ({ status = undefined }: { status?: OrderStatus }) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['orders', status],
    queryFn: () => getOrders({ status }),
    staleTime: 1000 * 60 * 60,
  });

  return { data, isPending, isError, error };
};
