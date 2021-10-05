import * as React from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';

import { Button } from '~/components/ui';

export function FavouriteButton() {
  return (
    <Button
      variant="transparentWhite"
      css={{
        zIndex: 1,
        position: 'absolute',
        right: 0,
        color: 'white',
        height: 50
      }}
    >
      <IoHeartOutline size={42} />
    </Button>
  );
}
