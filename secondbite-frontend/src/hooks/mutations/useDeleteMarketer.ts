import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { deleteMarketer } from '../../services/marketer';
import { queryClient } from '../../libs/tanstackQuery';

export const useDeleteMarketer = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => await deleteMarketer(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['userAuth'],
        refetchType: 'none',
      });
      toast.success('Conta excluída com sucesso.');
      navigate('/login');
    },
    onError: () => {
      toast.error('Erro ao excluir conta.');
    },
  });
};
