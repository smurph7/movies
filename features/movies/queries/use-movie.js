import { useQuery, useQueryClient } from 'react-query';

import { transformMovieData } from '../utils/transform-movie-data';
import { moviesAxios } from '../../../api-client';

export async function fetchMovie({ queryKey }) {
  const [, { id }] = queryKey;

  const { data } = await moviesAxios.get(`/movie/${id}`);

  return data;
}

export function useMovie({ id, movie }) {
  return useQuery(['movie', { id }], fetchMovie, {
    enabled: !!id,
    initialData: movie,
    select: data => transformMovieData(data)
  });
}

export function usePrefetchMovie() {
  const queryClient = useQueryClient();

  async function handlePrefetch({ id }) {
    await queryClient.prefetchQuery(['movie', { id }], fetchMovie, {
      staleTime: 5 * 60 * 1000 // 5 minutes
    });
  }
  return { handlePrefetch };
}
