/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
        FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,

        INSTAGRAM_CLIENT_SECRET: process.env.INSTAGRAM_CLIENT_SECRET,
        INSTAGRAM_CLIENT_ID: process.env.INSTAGRAM_CLIENT_ID,
        INSTAGRAM_REDIRECT_URI: process.env.INSTAGRAM_REDIRECT_URI,
    },
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: 'https://api.instagram.com/:path*',
            },
        ]
    },
};

export default nextConfig;
