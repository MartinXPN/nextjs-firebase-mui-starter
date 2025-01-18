// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    debug: false,
    enabled: process.env.NODE_ENV !== 'development',

    ignoreErrors: [
        'ResizeObserver loop limit exceeded',                                       // Chrome ResizeObserver
        'ResizeObserver loop completed with undelivered notifications',             // Firefox ResizeObserver
        'ResizeObserver loop limit exceeded',                                       // Safari ResizeObserver
        'auth/too-many-requests',                                                   // Firebase rate limiting
        'Failed to get document because the client is offline',                     // Firebase offline
        'FirebaseError: Missing or insufficient permissions.',                      // Firebase permissions
        'INTERNAL ASSERTION FAILED: Pending promise was never set',                 // Firebase/auth assertion
        'TypeError: Failed to fetch',                                               // Firebase installations
        'Loading CSS chunk',                                                        // Next.js chunk loading
        'TypeError: Load failed',                                                   // Next.js chunk loading
        "Unexpected token '<'",                                                     // HTML parsing errors
        "expected expression, got '<'",                                             // HTML parsing errors
        'Minified React error #',                                                   // React errors
    ],

    tracesSampleRate: 0.01,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.005,

    integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
            maskAllText: false,
        }),
    ],
});
