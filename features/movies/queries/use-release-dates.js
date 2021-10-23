import * as React from 'react';

import { useMovie } from '.';

export function useReleaseDates({ id }) {
  return useMovie({
    id,
    queryConfig: {
      select: React.useCallback(data => data?.releaseDates, [])
    }
  });
}
