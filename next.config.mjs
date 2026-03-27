/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  transpilePackages: ['three'],
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
