import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

import { transformProfileData } from '../utils/transform-profile-data';

async function updateProfile(newProfileData) {
  const { data } = await axios.patch('/api/auth/profile', newProfileData);
  return transformProfileData(data);
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
