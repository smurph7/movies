import { useQuery } from 'react-query';

import { moviesAxios } from '../../../api-client';

function transformTrailerData(data) {
  const trailers = data?.results.filter(
    result =>
      result?.type?.toLowerCase() === 'trailer' &&
      result?.site?.toLowerCase() === 'youtube'
  );
  return trailers.map(trailer => ({
    ...trailer,
    publishedAt: trailer.published_at
  }));
}

export async function fetchTrailers({ queryKey }) {
  const [, { id }] = queryKey;

  const { data } = await moviesAxios.get(`/movie/${id}/videos`);

  return data;
}

export function useTrailers({ id }) {
  return useQuery(['trailers', { id }], fetchTrailers, {
    enabled: !!id,
    select: data => transformTrailerData(data)
  });
}
