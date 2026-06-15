import {withPostHogConfig} from '@posthog/nextjs-config';
import type {NextConfig} from 'next';

const config: NextConfig = {
    reactStrictMode: true,
    reactCompiler: true,
    productionBrowserSourceMaps: true,
    skipTrailingSlashRedirect: true,
    experimental: {
        useCache: true,
    },
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js',
            },
        },
    },
    images: {
        remotePatterns: [
            {protocol: 'https', hostname: '**.googleapis.com'},
            {protocol: 'https', hostname: 'flagcdn.com'},
        ],
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    },
    async rewrites() {
        return [{
            source: '/phg/static/:path*',
            destination: 'https://us-assets.i.posthog.com/static/:path*',
        }, {
            source: '/phg/:path*',
            destination: 'https://us.i.posthog.com/:path*',
        }];
    },
};

export default withPostHogConfig(config, {
    personalApiKey: process.env.POSTHOG_API_KEY!,
    projectId: process.env.POSTHOG_PROJECT_ID,
    host: 'https://us.i.posthog.com',
    logLevel: 'error',
    sourcemaps: {
        enabled: process.env.VERCEL_ENV === 'production',
        batchSize: 500,
        releaseName: 'next-firebase-mui-starter',
        releaseVersion: process.env.VERCEL_GIT_COMMIT_SHA,
    },
});
