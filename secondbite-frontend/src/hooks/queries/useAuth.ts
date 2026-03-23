import { useQuery } from '@tanstack/react-query';
import { getCheckAuth } from '../../services/auth';

export const useAuth = (enabled = true) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['userAuth'],
    queryFn: () => getCheckAuth(),
    staleTime: 1000 * 30,
    retry: false,
    enabled,
  });

  return { userAuth: data?.user, isPending, isError, error };
};
