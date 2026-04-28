import { useMutation } from '@tanstack/react-query';
import { addToCart } from '../../services/cart';
import { queryClient } from '../../libs/tanstackQuery';
import { toast } from 'sonner';
import type { CustomError } from '../../utils/CustomError';

export const useAddToCart = () => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addToCart,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['cart'],
      });

      toast.success('Produto adicionado!');
    },
    onError: (error: CustomError) => {
      if (error.status === 401) toast.error('É necessário fazer o login');
      else toast.error(error.message || 'Não foi possível adicionar no carrinho');
    },
  });

  return { mutate, isPending, isError, error };
};
