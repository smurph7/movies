import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

async function getFavourites() {
  const { data } = await axios.get('/api/auth/profile');
  return { ...data, favourites: data.user_metadata.favourites };
}

export function useFavouritesQuery() {
  return useQuery('favourites', getFavourites);
}

async function updateFavourites({ newFavourites, currentFavourites = [] }) {
  const favourites = [
    ...currentFavourites,
    ...newFavourites.favourites.filter(
      favourite => !currentFavourites.includes(favourite)
    )
  ];
  const { data } = await axios.patch('/api/auth/profile', { favourites });
  return data;
}

export function useUpdateFavouritesMutation() {
  const { data: currentFavourites } = useFavouritesQuery();
  const queryClient = useQueryClient();
  const queryKey = ['favourites'];
  return useMutation(
    newFavourites => updateFavourites({ newFavourites, currentFavourites }),
    {
      onMutate: async updatedFavourites => {
        await queryClient.cancelQueries(queryKey);
        const previous = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey, old => {
          const oldFavourites = old?.userMetadata?.favourites ?? [];
          const newFavourites = [
            ...oldFavourites,
            ...updatedFavourites.favourites.filter(
              favourite => !oldFavourites.includes(favourite)
            )
          ];

          return {
            ...newFavourites
          };
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
