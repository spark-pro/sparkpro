import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow up to 10 MB bodies (for resume uploads)
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
