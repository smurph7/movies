import axios from 'axios';

const moviesApiConfig = { baseURL: '/api/movies' };
export const moviesAxios = axios.create(moviesApiConfig);
