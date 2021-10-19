import * as React from 'react';

import { useFavourites } from './use-favourites';

export function useIsFavourite(id) {
  return useFavourites({
    queryConfig: {
      select: React.useCallback(data => data?.includes(id), [id])
    }
  });
}
