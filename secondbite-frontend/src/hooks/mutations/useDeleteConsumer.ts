import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { queryClient } from '../../libs/tanstackQuery';
import { deleteConsumer } from '../../services/consumer';
import { toast } from 'sonner';

export const useDeleteConsumer = () => {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: deleteConsumer,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['userAuth'],
        refetchType: 'none',
      });

      navigate('/login');
    },
    onError: () => {
      toast.error('Ocorreu um erro ao excluir a conta');
    },
  });

  return { mutate, isPending, isError, error };
};
