/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.pravatar.cc', 'lh3.googleusercontent.com', 'firebasestorage.googleapis.com'],
  },
};

module.exports = nextConfig;
