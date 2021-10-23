import * as React from 'react';

import { moviesAxios } from '../../../api-client';

import { useMovie } from '.';

export async function fetchMovieWatchProviders({ queryKey }) {
  const [, { id }] = queryKey;

  const { data } = await moviesAxios.get(`/movie/${id}/watch/providers`);

  return data;
}

export function useWatchProviders({ id }) {
  return useMovie({
    id,
    queryConfig: {
      select: React.useCallback(data => data?.watchProviders, [])
    }
  });
}
