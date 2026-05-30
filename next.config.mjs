/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  experimental: {
    // Disable Turbopack (still experimental) to avoid "server relative imports" errors
    turbopack: false,
  },
};

export default nextConfig;
