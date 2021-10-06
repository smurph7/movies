import * as React from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { useDebouncedCallback } from 'use-debounce';

import { Button } from '~/components/ui';
import {
  useAddFavouriteMutation,
  useIsFavouriteQuery,
  useRemoveFavouriteMutation
} from '~/components/user/hooks';

export function FavouriteButton({ movieId }) {
  const { data: isFavourite } = useIsFavouriteQuery(movieId);
  const { mutate: addFavourite } = useAddFavouriteMutation();
  const { mutate: removeFavourite } = useRemoveFavouriteMutation();

  const handleAddFavourite = useDebouncedCallback(
    () => addFavourite(movieId),
    200
  );

  const handleRemoveFavourite = useDebouncedCallback(
    () => removeFavourite(movieId),
    200
  );

  function handleClick() {
    if (isFavourite) {
      handleRemoveFavourite();
    } else {
      handleAddFavourite();
    }
  }

  return (
    <Button
      variant="semiTransparentGray"
      onClick={handleClick}
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
      {isFavourite ? <IoHeart size={24} /> : <IoHeartOutline size={24} />}
    </Button>
  );
}
