'use client';

import {createContext} from 'react';
import type {ReactNode} from 'react';

export const ClientCookiesContext = createContext<Record<string, string>>({});

export default function ClientCookiesProvider({cookieData, children}: {
    cookieData: Record<string, string>,
    children: ReactNode,
}) {
    return <ClientCookiesContext.Provider value={cookieData}>
        {children}
    </ClientCookiesContext.Provider>
}
