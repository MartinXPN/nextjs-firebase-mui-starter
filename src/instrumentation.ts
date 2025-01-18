import * as Sentry from '@sentry/nextjs';

export function register() {
    Sentry.init({
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
        tracesSampleRate: 0.01,
        debug: false,
        enabled: process.env.NODE_ENV !== 'development',
    });
}
