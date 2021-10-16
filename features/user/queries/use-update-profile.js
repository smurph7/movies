import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

async function updateProfile(newProfileData) {
  const { data } = await axios.patch('/api/auth/profile', newProfileData);
  return data;
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation(newProfileData => updateProfile(newProfileData), {
    onSuccess: updatedProfileData => {
      queryClient.setQueryData('profile', updatedProfileData);
    },
    onError: error => console.error(`Error: ${error}`)
  });
}
