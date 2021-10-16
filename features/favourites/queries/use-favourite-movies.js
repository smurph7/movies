import { useQuery } from 'react-query';

import { moviesAxios } from '../../../api-client';

import { useFavourites } from './use-favourites';

import { transformMoviesData } from '~/features/movies/utils/transform-movie-data';

export async function fetchMovie({ queryKey }) {
  const [, { favourites }] = queryKey;
  const requests = favourites.map(
    favourite =>
      new Promise(resolve => {
        moviesAxios
          .get(`/movie/${favourite}`)
          .then(({ data }) => {
            resolve(data);
          })
          .catch(error => {
            resolve(error);
          });
      })
  );

  return Promise.all(requests)
    .then(data => data)
    .catch(err => console.error(err));
}

export function useFavouriteMovies() {
  const { data: favourites } = useFavourites();
  return useQuery(['favouriteMovies', { favourites }], fetchMovie, {
    enabled: !!favourites,
    select: data => transformMoviesData({ results: data })
  });
}
