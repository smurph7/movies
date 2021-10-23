import * as React from 'react';

import { useMovie } from '.';

export function useTrailers({ id }) {
  return useMovie({
    id,
    queryConfig: {
      select: React.useCallback(data => data?.trailers, [])
    }
  });
}
