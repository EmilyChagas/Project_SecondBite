import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../libs/tanstackQuery';
import { toast } from 'sonner';
import { updateConsumer } from '../../services/consumer';

export const useUpdateConsumer = () => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateConsumer,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['userAuth'],
      });

      toast.success('Atualizado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao atualizar seu perfil');
    },
  });

  return { mutate, isPending, isError, error };
};
