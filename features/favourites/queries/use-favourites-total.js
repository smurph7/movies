import * as React from 'react';

import { useFavourites } from './use-favourites';

export function useFavouritesTotal() {
  return useFavourites({
    queryConfig: {
      select: React.useCallback(data => data?.length)
    }
  });
}
