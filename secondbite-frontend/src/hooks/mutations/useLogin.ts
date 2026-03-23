import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { postLogin } from '../../services/auth';
import { queryClient } from '../../libs/tanstackQuery';
import { toast } from 'sonner';

export const useLogin = () => {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: postLogin,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['userAuth'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['cart'],
        }),
      ]);

      navigate('/');
      toast.success('Login realizado com sucesso');
    },
    onError: () => {
      toast.error('Dados incorretos!');
    },
  });

  return { mutate, isPending, isError, error };
};
