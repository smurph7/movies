import * as React from 'react';

import { useFavouriteMovies } from '~/components/movies/hooks/use-favourite-movies';
import { Layout } from '~/components/common';
import { MovieTiles } from '~/components/movies';

export default function Favourites() {
  const favouritesQuery = useFavouriteMovies();

  return (
    <Layout>
      <MovieTiles
        title="Favourites"
        movies={favouritesQuery?.data?.results}
        isLoading={favouritesQuery.isLoading}
      />
    </Layout>
  );
}
