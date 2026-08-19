'use client';
import {getApp, getApps, initializeApp} from 'firebase/app';
import {browserLocalPersistence, browserPopupRedirectResolver, initializeAuth} from 'firebase/auth';
import {initializeFirestore} from 'firebase/firestore';
import prodConfig from '@/firebase-config';


// Use initializeAuth/initializeFirestore instead of getAuth/getFirestore to prevent issues with Safari + IndexedDB
export const app = getApps().length ? getApp() : initializeApp(prodConfig);
export const firestore = initializeFirestore(app, {ignoreUndefinedProperties: true});
export const auth = initializeAuth(app, typeof window === 'undefined' ? {} : {
    persistence: browserLocalPersistence,
    popupRedirectResolver: browserPopupRedirectResolver,
});
