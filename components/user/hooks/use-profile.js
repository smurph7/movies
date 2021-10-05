import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

async function getProfile() {
  const { data } = await axios.get('/api/auth/profile');
  return { ...data, userMetadata: data.user_metadata };
}

export function useProfileQuery() {
  return useQuery('profile', getProfile);
}

export function useFavouritesQuery() {
  return useQuery('favourites', getProfile, {
    select: profile => profile?.userMetadata?.favourites
  });
}

async function updateProfile(newProfileData) {
  const { data } = await axios.patch('/api/auth/profile', newProfileData);
  return data;
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation(newProfileData => updateProfile(newProfileData), {
    onSuccess: updatedProfileData => {
      queryClient.setQueryData('profile', updatedProfileData);
    },
    onError: error => console.error(`Error: ${error}`)
  });
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
