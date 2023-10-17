import {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies";
import {RequestCookies} from "next/dist/server/web/spec-extension/cookies";
import {cache} from "react";
import {getTokens} from "next-firebase-auth-edge/lib/next/tokens";
import {AuthUser} from "./AuthContext";
import {filterStandardClaims} from "next-firebase-auth-edge/lib/auth/claims";


export const getUser = cache(async (cookies: RequestCookies | ReadonlyRequestCookies): Promise<AuthUser | null> => {
    const tokens = await getTokens(cookies, {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY!,
        cookieName: 'AuthCookie',
        cookieSignatureKeys: [process.env.COOKIE_SECRET_CURRENT!, process.env.COOKIE_SECRET_PREVIOUS!],
        serviceAccount: {
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
            clientEmail: process.env.PRIVATE_FIREBASE_CLIENT_EMAIL!,
            // Using JSON to handle newline problems when storing the
            // key as a secret in Vercel. See:
            // https://github.com/vercel/vercel/issues/749#issuecomment-707515089
            privateKey: JSON.parse(process.env.PRIVATE_FIREBASE_PRIVATE_KEY!),
        },
    });

    if (!tokens)
        return null;
    const decodedToken = tokens.decodedToken;
    return {
        id: decodedToken.uid,
        email: decodedToken.email ?? null,
        emailVerified: decodedToken.email_verified ?? false,
        phoneNumber: decodedToken.phone_number ?? null,
        displayName: decodedToken.name ?? null,
        photoURL: decodedToken.picture ?? null,
        claims: filterStandardClaims(decodedToken),
        signInProvider: decodedToken.firebase.sign_in_provider,
    }
});
