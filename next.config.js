/** @type {import('next').NextConfig} */

// This file replaces any existing next.config.ts or next.config.js
const nextConfig = {
  // Enable React strict mode for development
  reactStrictMode: true,
  
  // Configure image domains for avatar images (Google, GitHub, etc.)
  images: {
    domains: [
      'lh3.googleusercontent.com',     // Google avatars
      'avatars.githubusercontent.com', // GitHub avatars
      'github.com',
      'googleusercontent.com',
      'avatar-management--avatars.us-west-2.prod.public.atl-paas.net', // More avatar services
    ],
  },
  
  // Properly handle third-party packages
  transpilePackages: ['flowbite-react'],
  
  // Experimental features configuration
  experimental: {
    // Turn off server components if causing issues
    serverActions: true,
    
    // Optimize for serverless deployments
    serverComponentsExternalPackages: [
      'bcrypt',
      '@prisma/client',
      'prisma',
    ],
  },
  
  // Disable the Edge runtime for specific routes to ensure Prisma works
  // This is important because Prisma doesn't work in Edge runtime
  excludeDefaultMomentLocales: true,
  
  // Handle Webpack configuration for compatibility
  webpack: (config, { isServer }) => {
    // Fix issues with specific modules if needed
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;

