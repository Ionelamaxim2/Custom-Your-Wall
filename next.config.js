/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/photos/logo.svg",
      },
    ];
  },
};

module.exports = nextConfig;
