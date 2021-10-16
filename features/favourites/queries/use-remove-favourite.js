import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

import { useFavourites } from './use-favourites';

async function removeFavourite(movieId, { currentFavourites = [] }) {
  const newFavourites = currentFavourites.filter(
    favourite => favourite !== movieId
  );
  const favourites = [...newFavourites];
  const { data } = await axios.patch('/api/auth/profile', { favourites });
  return data;
}

export function useRemoveFavourite() {
  const { data: currentFavourites } = useFavourites();
  const queryClient = useQueryClient();
  const queryKey = ['favourites'];
  return useMutation(
    movieId => removeFavourite(movieId, { currentFavourites }),
    {
      onMutate: async movieId => {
        await queryClient.cancelQueries(queryKey);
        const previous = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(() => {
          const newFavourites = currentFavourites.filter(
            favourite => favourite !== movieId
          );

          return [...newFavourites];
        });
        return { previous };
      },
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
      onError: error => console.error(`Error: ${error}`)
    }
  );
}
