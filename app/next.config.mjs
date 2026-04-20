/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'midcenturist-api.onrender.com',
      },
    ],
  },
}

export default nextConfig
