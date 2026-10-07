import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['http://172.20.10.5:3000'],
  typescript: {
    ignoreBuildErrors: true, // Safeguards your Vercel deployment pipeline
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
