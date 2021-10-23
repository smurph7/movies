import { useQuery, useQueryClient } from 'react-query';

import { transformMoviesData } from '../utils/transform-movie-data';
import { moviesAxios } from '../../../api-client';

export async function fetchGenre({ queryKey }) {
  const [, { id, page }] = queryKey;

  const { data } = await moviesAxios.get(
    `/discover/movie?with_genres=${id}&page=${page}`
  );

  return transformMoviesData(data);
}

export function useGenre({ id, page, genre }) {
  return useQuery(['genre', { id: id?.toString(), page }], fetchGenre, {
    enabled: !!id,
    initialData: genre
  });
}

export function usePrefetchGenre() {
  const queryClient = useQueryClient();

  async function handlePrefetch({ id, page = 1 }) {
    await queryClient.prefetchQuery(
      ['genre', { id: id?.toString(), page: page?.toString() }],
      fetchGenre,
      {
        staleTime: 5 * 60 * 1000 // 5 minutes
      }
    );
  }
  return { handlePrefetch };
}
