import { useQuery } from '@tanstack/react-query';
import { getMarketersLocations } from '../../services/marketer';

export const useMarketersLocations = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['marketers'],
    queryFn: () => getMarketersLocations(),
    staleTime: 1000 * 60 * 60,
  });

  return { data, isPending, isError, error };
};
