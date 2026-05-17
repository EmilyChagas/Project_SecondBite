import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { checkout } from '../../services/orders';
import { queryClient } from '../../libs/tanstackQuery';
import { toast } from 'sonner';
import type { CustomError } from '../../utils/CustomError';

export const useCheckout = () => {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: checkout,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['orders'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['cart'],
          refetchType: 'none',
        }),
      ]);

      navigate('/pedidos');
      toast.success('Pedido realizado com sucesso');
    },
    onError: (error: CustomError) => {
      toast.error(error.message ? error.message : 'Ocorreu um erro, tente mais tarde!');
    },
  });

  return { mutate, isPending, isError, error, isSuccess };
};
