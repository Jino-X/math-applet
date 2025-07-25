/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: {
        appIsrStatus: false,
    },
    env: {
        AUTH_PASSWORD: process.env.AUTH_PASSWORD,
        JWT_SECRET: process.env.JWT_SECRET,
    }
};

export default nextConfig;