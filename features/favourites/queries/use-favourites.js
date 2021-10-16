import { useQuery } from 'react-query';
import axios from 'axios';
import { useUser } from '@auth0/nextjs-auth0';

async function getFavourites() {
  const { data } = await axios.get('/api/auth/profile');
  return data.user_metadata.favourites;
}

export function useFavourites({ queryConfig } = {}) {
  const { user } = useUser();
  return useQuery('favourites', getFavourites, {
    ...queryConfig,
    enabled: !!user
  });
}
