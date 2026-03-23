import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { queryClient } from '../../libs/tanstackQuery';
import { logout } from '../../services/auth';

export const useLogout = () => {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['userAuth'],
        refetchType: 'none',
      });

      navigate('/login');
    },
    onError: () => {
      toast.error('Ocorreu um erro ao sair');
    },
  });

  return { mutate, isPending, isError, error };
};
