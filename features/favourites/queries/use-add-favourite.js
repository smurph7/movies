import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

import { useFavourites } from './use-favourites';

async function addFavourite(movieId, { currentFavourites = [] }) {
  const newFavourite = currentFavourites.includes(movieId) ? [] : [movieId];
  const favourites = [...currentFavourites, ...newFavourite];
  const { data } = await axios.patch('/api/auth/profile', { favourites });
  return data;
}

export function useAddFavourite() {
  const { data: currentFavourites } = useFavourites();
  const queryClient = useQueryClient();
  const queryKey = ['favourites'];
  return useMutation(movieId => addFavourite(movieId, { currentFavourites }), {
    onMutate: async movieId => {
      await queryClient.cancelQueries(queryKey);
      const previous = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, old => {
        const oldFavourites = old ?? [];
        const newFavourite = oldFavourites.includes(movieId) ? [] : [movieId];

        return [...oldFavourites, ...newFavourite];
      });
      return { previous };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
    onError: error => console.error(`Error: ${error}`)
  });
}
