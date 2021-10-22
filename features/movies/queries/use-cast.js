import { useQuery } from 'react-query';

import { moviesAxios } from '../../../api-client';

export async function fetchCast({ queryKey }) {
  const [, { id }] = queryKey;

  const { data } = await moviesAxios.get(`/movie/${id}/cast`);

  return data;
}

export function useCast({ id }) {
  return useQuery(['cast', { id }], fetchCast, {
    enabled: !!id,
    select: data => data
  });
}
