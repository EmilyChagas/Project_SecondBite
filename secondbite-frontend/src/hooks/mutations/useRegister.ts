import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { registerConsumer, registerMarketer } from '../../services/auth';
import { queryClient } from '../../libs/tanstackQuery';

export const useRegisterConsumer = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerConsumer,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['userAuth'] });
      toast.success('Conta criada com sucesso!');
      navigate('/');
    },
    onError: error => {
      toast.error(error.message);
    }
  });
};

export const useRegisterMarketer = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerMarketer,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['userAuth'] });
      toast.success('Banca cadastrada com sucesso!');
      navigate('/feirante');
    },
    onError: error => {
      toast.error(error.message);
    }
  });
};
