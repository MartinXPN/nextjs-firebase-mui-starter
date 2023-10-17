'use client';
import {getApp, getApps, initializeApp} from "firebase/app"
import {initializeFirestore} from "firebase/firestore";
import {initializeAnalytics} from 'firebase/analytics';
import {initializePerformance} from 'firebase/performance';

const prodConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = !getApps().length ? initializeApp(prodConfig) : getApp();
export const firestore = initializeFirestore(app, {ignoreUndefinedProperties: true});
console.log('reconfigured the db to ignore undefined values', firestore.type);


// If we're on the client-side
if (app.name && typeof window !== 'undefined') {
    const perf = initializePerformance(app);
    console.log('perf enabled:', perf.dataCollectionEnabled);

    const analytics = initializeAnalytics(app);
    console.log('analytics:', analytics);
}
