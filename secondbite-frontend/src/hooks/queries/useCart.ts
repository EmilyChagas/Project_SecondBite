import { useQuery } from '@tanstack/react-query';
import { getCart } from '../../services/cart.ts';
import { CustomError } from '../../utils/CustomError.ts';

export const useCart = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    staleTime: 1000 * 60,
    retry(_, error: CustomError) {
      if (error.status == 401 || error.status === 404) return false;
      return true;
    },
  });

  return { data, isPending, isError, error };
};
