import posthog from 'posthog-js';

const IGNORED_ERROR_PATTERNS = [
    /ResizeObserver loop limit exceeded/i,                                  // Chrome/Safari ResizeObserver
    /ResizeObserver loop completed with undelivered notifications/i,        // Firefox ResizeObserver
    /auth\/too-many-requests/i,                                             // Firebase rate limiting
    /Failed to get document because the client is offline/i,                // Firebase offline
    /Missing or insufficient permissions/i,                                 // Firebase Firestore permissions
    /The user aborted a request/i,                                          // Cancelled requests
    /Loading CSS chunk/i,                                                   // Next.js chunk loading
    /Unexpected token '</i,                                                 // HTML parsing errors
    /expected expression, got '</i,                                         // HTML parsing errors
    /Minified React error #/i,                                              // React errors
    /Failed to execute 'sendBeacon' on 'Navigator':/i,                      // Browser beacon issues
];

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: '/phg',
    ui_host: 'https://us.posthog.com',
    defaults: '2025-05-24',

    session_recording: process.env.NODE_ENV === 'development' ? undefined : {
        maskAllInputs: false,
        maskInputOptions: {
            password: true,
        },
    },
    autocapture: process.env.NODE_ENV !== 'development',
    rageclick: process.env.NODE_ENV !== 'development',
    capture_pageview: process.env.NODE_ENV !== 'development',
    capture_pageleave: process.env.NODE_ENV !== 'development',
    capture_heatmaps: process.env.NODE_ENV !== 'development',
    capture_exceptions: process.env.NODE_ENV !== 'development',
    capture_performance: process.env.NODE_ENV !== 'development',

    // Filter out noisy client errors before they are sent to PostHog.
    before_send: cr => {
        if (process.env.NODE_ENV === 'development' || !cr)
            return null;

        if (cr.event === '$exception') {
            const list = (cr.properties?.['$exception_list'] ?? []);
            const message = list?.[0]?.value;

            if (message && IGNORED_ERROR_PATTERNS.some(pattern => pattern.test(message ?? '')))
                return null;
        }

        return cr;
    },
});
