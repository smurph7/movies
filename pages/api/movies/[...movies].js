import axios from 'axios';

const ROOT_ROUTE = 'movies';

export default async function handler(req, res) {
  const { query } = req;

  const endpoint = query[ROOT_ROUTE]?.join('/') ?? '';
  const queryParams = Object.keys(query)
    .filter(key => key !== ROOT_ROUTE)
    .map(key => `${key}=${query[key]}`)
    .join('&');
  const url = `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/${endpoint}${
    queryParams ? `?${queryParams}` : ''
  }`;

  try {
    const { data } = await axios({
      url,
      method: req.method,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
      },
      data: req.body
    });

    return res.status(200).json(data);
  } catch (error) {
    const statusCode = error.response?.status ?? 500;
    const errorMessage = {
      error: {
        statusCode,
        message: error.response?.statusText ?? error,
        ...(error.response?.data && { data: error.response?.data })
      }
    };
    console.error(errorMessage);
    return res.status(statusCode).json(errorMessage);
  }
}
