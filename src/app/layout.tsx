import {ReactNode} from "react";
import {Metadata} from "next";
import {cookies} from 'next/headers';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

import ThemeProvider from "@/theme/ThemeProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import AppLayout from "@/components/home/AppLayout";
import '@/polyfills';
import '@/firebase';
import '@/app/globals.css';
import AuthProvider from "@/auth/AuthProvider";
import {getUser} from "@/auth/getUser";


const title = 'Next.js + Firebase + MUI Starter';
const description = 'A starter template for Next.js + Firebase + MUI projects';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
        },
        twitter: {
            title: title,
            description: description,
        },
    };
}


export default async function RootLayout({children}: {
    children: ReactNode,
}) {
    const defaultUser = await getUser(await cookies());
    console.log(`layout default user: ${defaultUser?.id} with ${defaultUser?.signInProvider} provider`);

    return <>
        <html lang="en" suppressHydrationWarning>
        <head>
            <meta content="width=device-width, initial-scale=1" name="viewport"/>
            <link rel="icon" href="/favicon.ico"/>
            <meta property="og:site_name" content={title}/>
        </head>

        <body suppressHydrationWarning>
            <InitColorSchemeScript modeStorageKey="theme-mode" defaultMode="light" attribute="class" />
            <ThemeProvider>
            <ErrorBoundary>
            <AuthProvider defaultUser={defaultUser}>
            <AppLayout>
                {children}
            </AppLayout>
            </AuthProvider>
            </ErrorBoundary>
            </ThemeProvider>
        </body>
        </html>
    </>
}
