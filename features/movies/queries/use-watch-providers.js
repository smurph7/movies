import * as React from 'react';

import { useMovie } from '.';

export function useWatchProviders({ id }) {
  return useMovie({
    id,
    queryConfig: {
      select: React.useCallback(data => data?.watchProviders, [])
    }
  });
}
