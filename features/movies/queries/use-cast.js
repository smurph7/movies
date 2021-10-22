import { useQuery, useQueryClient } from 'react-query';

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
  return useQuery(['cast', { id: id?.toString() }], fetchCast, {
    enabled: !!id,
    select: data => transformCreditsData(data)
  });
}

export function usePrefetchCast() {
  const queryClient = useQueryClient();

  async function handlePrefetch({ id }) {
    await queryClient.prefetchQuery(
      ['cast', { id: id?.toString() }],
      fetchCast,
      {
        staleTime: 5 * 60 * 1000 // 5 minutes
      }
    );
  }
  return { handlePrefetch };
}
