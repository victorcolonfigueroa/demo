// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/sign-in',
        permanent: true, // Set to true if this is a permanent redirect
      },
    ];
  },
};
