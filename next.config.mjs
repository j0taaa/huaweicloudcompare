/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org'
      },
      {
        protocol: 'https',
        hostname: 'icons.veryicon.com'
      },
      {
        protocol: 'https',
        hostname: 'res-static.hc-cdn.cn'
      }
    ]
  }
};

export default nextConfig;
