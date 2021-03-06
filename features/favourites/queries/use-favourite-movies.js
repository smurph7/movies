import { useQuery, useQueryClient } from 'react-query';

import { moviesAxios } from '../../../api-client';

import { useFavourites } from './use-favourites';

import { transformMoviesData } from '~/features/movies/utils/transform-movie-data';

export async function fetchMovie({ queryKey }) {
  const [, { favourites, page, resultsPerPage }] = queryKey;
  const slice = [
    Number(page) * resultsPerPage - resultsPerPage,
    Number(page) * resultsPerPage
  ];
  const filteredFavourites = favourites.filter(favourite => favourite !== null);
  const requests = filteredFavourites
    .slice(slice[0], slice[1])
    .map(favourite => {
      if (favourite === null) {
        return;
      }
      return new Promise(resolve => {
        moviesAxios
          .get(`/movie/${favourite}`)
          .then(({ data }) => {
            resolve(data);
          })
          .catch(error => {
            resolve(error);
          });
      });
    });

  return Promise.all(requests)
    .then(data => transformMoviesData({ results: data }))
    .catch(err => console.error(err));
}

export function useFavouriteMovies({ page = 1, resultsPerPage = 20 }) {
  const { data: favourites } = useFavourites();
  return useQuery(
    [
      'favouriteMovies',
      {
        favourites,
        page: page.toString(),
        resultsPerPage: resultsPerPage.toString()
      }
    ],
    fetchMovie,
    { enabled: !!favourites }
  );
}

export function usePrefetchFavourites() {
  const queryClient = useQueryClient();
  const { data: favourites } = useFavourites();

  async function handlePrefetch({ page, resultsPerPage = 20 }) {
    await queryClient.prefetchQuery(
      [
        'favouriteMovies',
        {
          favourites,
          page: page.toString(),
          resultsPerPage: resultsPerPage.toString()
        }
      ],
      fetchMovie,
      {
        staleTime: 5 * 60 * 1000 // 5 minutes
      }
    );
  }
  return { handlePrefetch };
}
