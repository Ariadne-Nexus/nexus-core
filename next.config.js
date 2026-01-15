/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Next.js expects an object for `serverActions` in newer versions.
    // Setting to an empty object preserves the flag without using a boolean.
    serverActions: {},
  },
};

export default nextConfig;
