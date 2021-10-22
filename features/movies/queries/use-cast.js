import { useQuery } from 'react-query';

import { moviesAxios } from '../../../api-client';

function transformCreditsData(data) {
  return data.cast
    .sort(castMember => castMember.order)
    .slice(0, 10)
    .map(castMember => ({
      id: 10859,
      name: castMember.name,
      profilePath: castMember.profile_path,
      castId: castMember.cast_id,
      character: castMember.character,
      creditId: castMember.credit_id,
      order: castMember.order
    }));
}

export async function fetchCast({ queryKey }) {
  const [, { id }] = queryKey;

  const { data } = await moviesAxios.get(`/movie/${id}/credits`);

  return data;
}

export function useCast({ id }) {
  return useQuery(['cast', { id }], fetchCast, {
    enabled: !!id,
    select: data => transformCreditsData(data)
  });
}
