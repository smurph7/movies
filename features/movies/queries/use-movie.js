import { useQuery, useQueryClient } from 'react-query';

import { transformMovieData } from '../utils/transform-movie-data';
import { moviesAxios } from '../../../api-client';

export async function fetchMovie({ queryKey }) {
  const [, { id }] = queryKey;

  const { data } = await moviesAxios.get(
    `/movie/${id}?append_to_response=watch/providers`
  );

  return transformMovieData(data);
}

export function useMovie({ id, movie, queryConfig } = {}) {
  return useQuery(['movie', { id: id?.toString() }], fetchMovie, {
    ...queryConfig,
    enabled: !!id,
    initialData: movie
  });
}

export function usePrefetchMovie() {
  const queryClient = useQueryClient();

  async function handlePrefetch({ id }) {
    await queryClient.prefetchQuery(
      ['movie', { id: id?.toString() }],
      fetchMovie,
      {
        staleTime: 5 * 60 * 1000 // 5 minutes
      }
    );
  }
  return { handlePrefetch };
}
