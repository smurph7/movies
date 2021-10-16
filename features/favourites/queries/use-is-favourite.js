import * as React from 'react';

import { useFavourites } from './use-favourites';

export function useIsFavourite(movieId) {
  return useFavourites({
    queryConfig: {
      select: React.useCallback(data => data?.includes(movieId), [movieId])
    }
  });
}
