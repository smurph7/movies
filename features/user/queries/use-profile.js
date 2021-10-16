import { useQuery } from 'react-query';
import axios from 'axios';

async function getProfile() {
  const { data } = await axios.get('/api/auth/profile');
  return { ...data, userMetadata: data.user_metadata };
}

export function useProfile() {
  return useQuery('profile', getProfile);
}
