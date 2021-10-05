import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

const axios = require('axios');

async function getAccessToken() {
  const body = JSON.stringify({
    client_id: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
    client_secret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
    audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
    grant_type: 'client_credentials'
  });

  const config = {
    method: 'post',
    url: `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: body
  };
  const { data } = await axios(config);
  return data;
}

async function getProfile({ req, res, url }) {
  const { access_token: accessToken } = await getAccessToken();
  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return res.status(200).json(data);
}

async function patchProfile({ req, res, url }) {
  const { access_token: accessToken } = await getAccessToken();
  const { data } = await axios.patch(
    url,
    {
      user_metadata: req.body
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
  return res.status(200).json(data);
}

async function profile(req, res) {
  const { user } = await getSession(req, res);
  const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${user.sub}`;

  try {
    switch (req.method) {
      case 'GET': {
        await getProfile({ req, res, url });
        break;
      }
      case 'PATCH': {
        await patchProfile({ req, res, url });
        break;
      }
      default:
        res.status(405).json({ error: 'Invalid method' });
    }
  } catch (error) {
    const statusCode = error.response?.status ?? 500;
    console.error(error);
    return res.status(statusCode).json(error);
  }
}

export default withApiAuthRequired(profile);
