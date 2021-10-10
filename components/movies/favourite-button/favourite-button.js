import * as React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { useDebouncedCallback } from 'use-debounce';

import { Text, Button } from '~/components/ui';
import {
  useAddFavouriteMutation,
  useIsFavouriteQuery,
  useRemoveFavouriteMutation
} from '~/components/user/hooks';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '~/components/ui/popover';

export function FavouriteButton({ movieId }) {
  const { user } = useUser();
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
    if (user) {
      if (isFavourite) {
        handleRemoveFavourite();
      } else {
        handleAddFavourite();
      }
    }
  }

  return (
    <Popover trigger="hover">
      <PopoverTrigger asChild>
        <Button
          aria-label={`favourite-${isFavourite ? 'heart' : 'heart-outline'}`}
          variant="semiTransparentGray"
          onClick={handleClick}
          css={{
            position: 'absolute',
            top: 0,
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
      </PopoverTrigger>
      {!user && (
        <PopoverContent css={{ bg: '$sage3', padding: '$2' }}>
          <Text color="gray" fontSize={1}>
            Login to add this movie to your favourites
          </Text>
        </PopoverContent>
      )}
    </Popover>
  );
}
