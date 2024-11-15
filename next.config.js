const { withFaust, getWpHostname } = require('@faustwp/core');
// const { createSecureHeaders } = require('next-secure-headers');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['node_modules'],
  },
  images: {
    domains: [getWpHostname()],
  },
});
// trigger build
