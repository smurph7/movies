import { useQuery, useQueryClient } from 'react-query';

import { transformMoviesData } from '../utils/transform-movie-data';
import { moviesAxios } from '../../../api-client';

export async function fetchGenre({ queryKey }) {
  const [, { id, page }] = queryKey;

  const { data } = await moviesAxios.get(
    `/discover/movie?with_genres=${id}&page=${page}`
  );

  return data;
}

export function useGenre({ id, page, genre }) {
  return useQuery(['genre', { id, page }], fetchGenre, {
    enabled: !!id,
    initialData: genre,
    select: data => transformMoviesData(data)
  });
}

// export function usePrefetchMovie() {
//   const queryClient = useQueryClient();

//   async function handlePrefetch({ id }) {
//     await queryClient.prefetchQuery(['movie', { id }], fetchMovie, {
//       staleTime: 5 * 60 * 1000 // 5 minutes
//     });
//   }
//   return { handlePrefetch };
// }
