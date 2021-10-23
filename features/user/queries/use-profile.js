import { useQuery } from 'react-query';
import axios from 'axios';

import { transformProfileData } from '../utils/transform-profile-data';

async function getProfile() {
  const { data } = await axios.get('/api/auth/profile');
  return transformProfileData(data);
}

export function useProfile() {
  return useQuery('profile', getProfile);
}
