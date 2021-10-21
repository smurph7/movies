module.exports = {
  images: {
    domains: ['image.tmdb.org', 'lh3.googleusercontent.com', 's.gravatar.com']
  },
  async redirects() {
    return [
      {
        source: '/favourites',
        destination: '/favourites/1',
        permanent: true
      }
    ];
  }
};
