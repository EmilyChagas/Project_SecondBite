import { useMutation } from '@tanstack/react-query';
import { updateCartItem } from '../../services/cart';
import { queryClient } from '../../libs/tanstackQuery';
import { toast } from 'sonner';
import type { CustomError } from '../../utils/CustomError';

export const useUpdateCartItem = () => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateCartItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
    onError: (error: CustomError) => {
      console.log({ error });
      toast.error(error.message ? error.message : 'Não foi possível atualizar o item');
    },
  });

  return { mutate, isPending, isError, error };
};
