import {NextRequest, NextResponse} from 'next/server';
import {authentication} from "next-firebase-auth-edge/lib/next/middleware";


const commonOptions = {
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY!,
    cookieName: 'AuthCookie',
    cookieSignatureKeys: [process.env.COOKIE_SECRET_CURRENT!, process.env.COOKIE_SECRET_PREVIOUS!],
    cookieSerializeOptions: {
        path: '/',
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'true', // Set this to true on HTTPS environments
        sameSite: 'lax' as const,   // https://github.com/vercel/next.js/discussions/41745#discussioncomment-5408993
        maxAge: 12 * 60 * 60 * 24,  // twelve days
    },
    serviceAccount: {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
        clientEmail: process.env.PRIVATE_FIREBASE_CLIENT_EMAIL!,
        // Using JSON to handle newline problems when storing the key as a secret in Vercel
        // https://github.com/vercel/vercel/issues/749#issuecomment-707515089
        privateKey: JSON.parse(process.env.PRIVATE_FIREBASE_PRIVATE_KEY!),
    },
};


export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // `/_next/` and `/demo/*` are ignored by the watcher, but we need to ignore other files in `public` manually
    if ([
        '/manifest.json',
        '/robots.txt',
        '/sitemap.xml',
        '/logo192.png',
        '/logo512.png',
        '/logo.svg',
        '/next.svg',
        '/vercel.svg',
    ].includes(pathname))
        return;
    console.log('pathname:', pathname);

    // Handle authentication
    if ([commonOptions.loginPath, commonOptions.logoutPath].includes(pathname)) {
        console.log('handling auth:', pathname);
        return authentication(request, {
            ...commonOptions,
            handleValidToken: async ({ token, decodedToken }) => {
                console.log('Successfully authenticated', { token, decodedToken });
                return NextResponse.next();
            },
            handleInvalidToken: async () => {
                console.log('Not authenticated or token expired');
                return NextResponse.next();
            },
            handleError: async (error) => {
                console.error('Oops, this should not have happened.', { error });
                return NextResponse.next();
            },
        });
    }
}

export const config = {
    matcher: [
        // Skip all internal paths (_next, _vercel, assets, etc.)
        '/((?!_next/static|_next/image|_vercel/insights|monitoring|demo|assets|favicon.ico).*)',
    ],
}
