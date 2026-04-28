import { useMutation } from '@tanstack/react-query';
import { createReview, updateReview, deleteReview } from '../../services/reviews';
import { toast } from 'sonner';
import { queryClient } from '../../libs/tanstackQuery';

export const useReviewActions = () => {
  const create = useMutation({
    mutationFn: createReview,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['marketer-reviews'] });
      toast.success('Avaliação enviada com sucesso!');
    },
    onError: () => toast.error('Erro ao enviar avaliação.'),
  });

  const update = useMutation({
    mutationFn: updateReview,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['marketer-reviews'] });
      toast.success('Avaliação atualizada!');
    },
    onError: () => toast.error('Erro ao atualizar avaliação.'),
  });

  const remove = useMutation({
    mutationFn: deleteReview,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['marketer-reviews'] });
      toast.success('Avaliação removida.');
    },
    onError: () => toast.error('Erro ao excluir avaliação.'),
  });

  return { create, update, remove };
};
