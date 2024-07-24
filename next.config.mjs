import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin("./src/lib/i18n.js");
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    serverRuntimeConfig: {
        host: "0.0.0.0",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname:'namito.tatadev.pro'
            },
            {
                protocol: "https",
                hostname:'food.tatadev.pro'
            }
        ]
    },
    output: "standalone",
    
};

 
export default withNextIntl(nextConfig);