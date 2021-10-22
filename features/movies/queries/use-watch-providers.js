import { useQuery } from 'react-query';

import { moviesAxios } from '../../../api-client';
import { transformWatchProviders } from '../utils/transform-movie-data';

export async function fetchMovieWatchProviders({ queryKey }) {
  const [, { id }] = queryKey;

  const { data } = await moviesAxios.get(`/movie/${id}/watch/providers`);

  return data;
}

export function useMovieWatchProviders({ id }) {
  return useQuery(
    ['watchProviders', { id: id?.toString() }],
    fetchMovieWatchProviders,
    {
      enabled: !!id,
      select: data => transformWatchProviders(data?.results?.AU)
    }
  );
}
