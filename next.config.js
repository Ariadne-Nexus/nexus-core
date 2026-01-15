/** @type {import('next').NextConfig} */
const nextConfig = {
  // Intentionally minimal. Keep experimental flags in `next.config.ts`.
  experimental: {
    // Next.js expects an object for `serverActions` in newer versions.
    // Setting to an empty object preserves the flag without using a boolean.
    serverActions: {},
  },
};

export default nextConfig;
