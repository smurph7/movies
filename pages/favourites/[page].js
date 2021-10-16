import * as React from 'react';

import { useFavouriteMovies } from '~/features/movies/hooks/use-favourite-movies';
import { Layout } from '~/features/common/components';
import { MovieTiles } from '~/features/movies/components';

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
