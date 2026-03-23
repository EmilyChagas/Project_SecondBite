import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateMarketer } from '../../services/marketer';

export const useUpdateMarketer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMarketer,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['userAuth'] });
      toast.success('Perfil atualizado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao atualizar o perfil.');
    },
  });
};
