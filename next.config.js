// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/",
        permanent: true, // Set to true if this is a permanent redirect
      },
    ];
  },
};
