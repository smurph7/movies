import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

import { useFavourites } from './use-favourites';

async function addFavourite(id, { currentFavourites = [] }) {
  const newFavourite = currentFavourites.includes(id) ? [] : [id];
  const favourites = [...currentFavourites, ...newFavourite];
  const { data } = await axios.patch('/api/auth/profile', { favourites });
  return data;
}

export function useAddFavourite() {
  const { data: currentFavourites } = useFavourites();
  const queryClient = useQueryClient();
  const queryKey = ['favourites'];
  return useMutation(id => addFavourite(id, { currentFavourites }), {
    onMutate: async id => {
      await queryClient.cancelQueries(queryKey);
      const previous = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, old => {
        const oldFavourites = old ?? [];
        const newFavourite = oldFavourites.includes(id) ? [] : [id];

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
