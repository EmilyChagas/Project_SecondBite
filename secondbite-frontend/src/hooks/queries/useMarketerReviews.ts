import { useInfiniteQuery } from '@tanstack/react-query';
import { getReviewsByMarketer } from '../../services/reviews';

export const useMarketerReviews = (id: string) => {
  const { fetchNextPage, hasNextPage, isPending, isFetchingNextPage, isError, error, data } = useInfiniteQuery({
    queryKey: ['marketer-reviews', id],
    queryFn: () => getReviewsByMarketer(id),
    enabled: !!id,
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
    data: data?.pages.flatMap(page => page?.data.content) ?? [],
  };
};
