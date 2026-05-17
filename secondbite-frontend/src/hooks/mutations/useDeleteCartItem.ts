import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../libs/tanstackQuery';
import { deleteCartItem } from '../../services/cart';
import { toast } from 'sonner';

export const useDeleteCartItem = () => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
    onError: () => {
      toast.error('Erro ao deletar o item do carrinho');
    },
  });

  return { mutate, isPending, isError, error };
};
