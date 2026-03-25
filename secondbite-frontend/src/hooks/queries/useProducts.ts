import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getProductId, getProducts, type GetProductsParams } from '../../services/products';

export const useProducts = ({ category, search }: GetProductsParams) => {
  const { fetchNextPage, hasNextPage, isPending, isFetchingNextPage, isError, error, data } = useInfiniteQuery({
    queryKey: ['products', category, search],
    queryFn: ({ pageParam = 0, signal }) =>
      getProducts({
        category,
        search,
        page: pageParam,
        signal,
      }),
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60,
    getNextPageParam: lastPage => (!lastPage?.data.isLast ? lastPage?.nextCursor : undefined),
  });

  return {
    fetchNextPage,
    hasNextPage,
    isPending,
    isFetchingNextPage,
    isError,
    error,
    products: data?.pages.flatMap(page => page?.data.content) ?? [],
  };
};

export const useProduct = ({ id, enabled = true }: { id: string; enabled?: boolean }) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['products', { id }],
    retry: 2,
    queryFn: ({ signal }) => getProductId({ id, signal }),
    staleTime: 1000 * 60 * 10,
    enabled: enabled && !!id && id !== 'novo',
  });

  return { data, isPending, isError, error };
};
