// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    debug: false,

    tracesSampleRate: 0.01,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.005,

    integrations: [
        new Sentry.BrowserTracing(),
        new Sentry.Replay({
            // Additional Replay configuration goes in here, for example:
            maskAllText: false,
            blockAllMedia: true,
        }),
    ],
});
