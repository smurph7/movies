import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

async function getProfile() {
  const { data } = await axios.get('/api/auth/profile');
  return { ...data, userMetadata: data.user_metadata };
}

export function useProfileQuery() {
  return useQuery('profile', getProfile);
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
