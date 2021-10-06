import * as React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

async function getFavourites() {
  const { data } = await axios.get('/api/auth/profile');
  return data.user_metadata.favourites;
}

export function useFavouritesQuery({ queryConfig } = {}) {
  return useQuery('favourites', getFavourites, { ...queryConfig });
}

export function useIsFavouriteQuery(movieId) {
  return useFavouritesQuery({
    queryConfig: {
      select: React.useCallback(data => data?.includes(movieId), [movieId])
    }
  });
}

async function addFavourite(movieId, { currentFavourites = [] }) {
  const newFavourite = currentFavourites.includes(movieId) ? [] : [movieId];
  const favourites = [...currentFavourites, ...newFavourite];
  const { data } = await axios.patch('/api/auth/profile', { favourites });
  return data;
}

export function useAddFavouriteMutation() {
  const { data: currentFavourites } = useFavouritesQuery();
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

async function removeFavourite(movieId, { currentFavourites = [] }) {
  const newFavourites = currentFavourites.filter(
    favourite => favourite !== movieId
  );
  const favourites = [...newFavourites];
  const { data } = await axios.patch('/api/auth/profile', { favourites });
  return data;
}

export function useRemoveFavouriteMutation() {
  const { data: currentFavourites } = useFavouritesQuery();
  const queryClient = useQueryClient();
  const queryKey = ['favourites'];
  return useMutation(
    movieId => removeFavourite(movieId, { currentFavourites }),
    {
      onMutate: async movieId => {
        await queryClient.cancelQueries(queryKey);
        const previous = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey, old => {
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
