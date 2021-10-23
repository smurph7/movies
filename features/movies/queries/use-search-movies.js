import { useQuery } from 'react-query';

import { transformMoviesData } from '../utils/transform-movie-data';
import { moviesAxios } from '../../../api-client';

export async function fetchSearchMovies({ queryKey }) {
  const [, { query, page }] = queryKey;

  const { data } = await moviesAxios.get(
    `/search/movie?query=${query}&page=${page}`
  );

  return transformMoviesData(data);
}

export function useSearchMovies({ query, page = 1 }) {
  return useQuery(
    ['search-movies', { query, page: page.toString() }],
    fetchSearchMovies,
    { enabled: !!query }
  );
}
