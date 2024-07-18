/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'images.ctfassets.net'
        }],
    },
    env: {
        CONTENTFUL_SPACE_ID: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
        CONTENTFUL_ACCESS_TOKEN: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
        API_VIDEO_API_KEY: process.env.API_VIDEO_API_KEY,
      },
};

export default nextConfig;
