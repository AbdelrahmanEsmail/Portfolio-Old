import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGitHubPages
  ? process.env.NEXT_PUBLIC_BASE_PATH || '/Portfolio-Website'
  : '';

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: 'export',
      basePath,
      trailingSlash: true,
      images: {
        unoptimized: true,
      },
    }
  : {};

export default nextConfig;
