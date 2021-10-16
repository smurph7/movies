import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

import { transformMoviesData } from './transform-movie-data';

import { useFavouritesQuery } from '~/features/user/hooks';

export async function fetchMovie({ queryKey }) {
  const [, { favourites }] = queryKey;
  const requests = favourites.map(
    favourite =>
      new Promise((resolve, reject) => {
        axios
          .get(
            `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${favourite}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
          )
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
  const { data: favourites } = useFavouritesQuery();
  return useQuery(['favouriteMovies', { favourites }], fetchMovie, {
    enabled: !!favourites,
    select: data => transformMoviesData({ results: data })
  });
}
