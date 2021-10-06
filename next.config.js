module.exports = {
  images: {
    domains: ['image.tmdb.org', 'lh3.googleusercontent.com']
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
