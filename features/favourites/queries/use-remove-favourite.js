import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

import { useFavourites } from './use-favourites';

async function removeFavourite(id, { currentFavourites = [] }) {
  const newFavourites = currentFavourites.filter(favourite => favourite !== id);
  const favourites = [...newFavourites];
  const { data } = await axios.patch('/api/auth/profile', { favourites });
  return data;
}

export function useRemoveFavourite() {
  const { data: currentFavourites } = useFavourites();
  const queryClient = useQueryClient();
  const queryKey = ['favourites'];
  return useMutation(id => removeFavourite(id, { currentFavourites }), {
    onMutate: async id => {
      await queryClient.cancelQueries(queryKey);
      const previous = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(() => {
        const newFavourites = currentFavourites.filter(
          favourite => favourite !== id
        );

        return [...newFavourites];
      });
      return { previous };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
    onError: error => console.error(`Error: ${error}`)
  });
}
