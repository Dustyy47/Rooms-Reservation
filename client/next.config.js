/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_API_URL: 'http:/localhost:5000'
  },
  images: {
    domains: ['localhost']
  }
};

module.exports = nextConfig;
