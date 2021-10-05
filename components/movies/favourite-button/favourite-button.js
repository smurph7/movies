import * as React from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';

import { Button } from '~/components/ui';

export function FavouriteButton() {
  return (
    <Button
      variant="semiTransparentGray"
      css={{
        zIndex: 1,
        position: 'absolute',
        right: 0,
        color: 'white',
        height: 30,
        '@bp1': {
          height: 50,
          width: 50
        },
        '@bp2': { height: 30, width: 'auto' }
      }}
    >
      <IoHeartOutline size={24} />
    </Button>
  );
}
