import {NextRequest, NextResponse} from 'next/server';
import {authMiddleware} from "next-firebase-auth-edge";


export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    console.log('pathname:', pathname);

    return authMiddleware(request, {
        loginPath: '/api/login',
        logoutPath: '/api/logout',
        refreshTokenPath: '/api/refresh-token',
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
        handleValidToken: async ({ token, decodedToken }, headers) => {
            console.log(`Valid auth: ${token.length} => ${decodedToken.uid} with ${decodedToken.firebase.sign_in_provider}`);
            return NextResponse.next({request: {headers}});
        },
        handleInvalidToken: async (reason) => {
            console.log('Not authenticated or token expired', {reason});
            return NextResponse.next();
        },
        handleError: async (error) => {
            console.error('Error: this should not have happened.', {error});
            return NextResponse.next();
        },
    });
}

export const config = {
    matcher: [
        // Skip all internal paths (_next, _vercel, assets, etc.)
        '/((?!_next|_vercel|opengraph|monitoring|speed-insights|fonts|assets|sitemap|favicon.ico|robots.txt|manifest.json|logo192.png|logo512.png|logo.svg|next.svg|vercel.svg).*)',
    ],
}
