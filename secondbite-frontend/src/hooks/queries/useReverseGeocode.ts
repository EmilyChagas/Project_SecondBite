import { useQuery } from '@tanstack/react-query';
import { getAddressFromCoordinates } from '../../services/location';

export const useReverseGeocode = (latitude?: number, longitude?: number) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['reverse-geocode', latitude, longitude],
    queryFn: () => getAddressFromCoordinates(latitude!, longitude!),
    enabled: !!latitude && !!longitude,
    staleTime: 1000 * 60 * 60 * 24,
    retry: 1,
  });

  return { data, isPending, isError, error };
};
