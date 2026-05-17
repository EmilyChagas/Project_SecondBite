import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { cancelOrder, acceptOrder, markOrderReady, completeOrder } from '../../services/orders';
import { queryClient } from '../../libs/tanstackQuery';
import type { CustomError } from '../../utils/CustomError';

export const useCancelOrder = () => {
  return useMutation({
    mutationFn: cancelOrder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Pedido cancelado com sucesso');
    },
    onError: (error: CustomError) => {
      toast.error(error.message || 'Erro ao cancelar o pedido.');
    },
  });
};

export const useAcceptOrder = () => {
  return useMutation({
    mutationFn: acceptOrder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Pedido aceito e em preparo!');
    },
    onError: (error: CustomError) => {
      toast.error(error.message || 'Erro ao aceitar pedido.');
    },
  });
};

export const useMarkOrderReady = () => {
  return useMutation({
    mutationFn: markOrderReady,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Pedido marcado como pronto para retirada!');
    },
    onError: (error: CustomError) => {
      toast.error(error.message || 'Erro ao atualizar pedido.');
    },
  });
};

export const useCompleteOrder = () => {

  return useMutation({
    mutationFn: completeOrder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Pedido finalizado com sucesso!');
    },
    onError: (error: CustomError) => {
      toast.error(error.message || 'Código incorreto ou erro ao finalizar.');
    },
  });
};
