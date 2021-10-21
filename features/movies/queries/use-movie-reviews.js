import { useQuery } from 'react-query';

import { moviesAxios } from '../../../api-client';

export async function fetchMovieReviews({ queryKey }) {
  const [, { id }] = queryKey;

  const { data } = await moviesAxios.get(`/movie/${id}/reviews`);

  return data;
}

export function useMovieReviews({ id }) {
  return useQuery(['reviews', { id }], fetchMovieReviews, {
    enabled: !!id,
    select: data => data
  });
}
