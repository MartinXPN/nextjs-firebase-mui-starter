import {initializeApp, getApps} from 'firebase-admin/app';
import {getFirestore, FieldValue, Timestamp, Transaction, DocumentReference} from 'firebase-admin/firestore';
import {getAuth} from 'firebase-admin/auth';

// Test config (fill out with your test project values)
const config = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
};


export const mockFirebase = () => {
    jest.doMock('firebase-admin/firestore', () => {
        const apps = getApps();
        const currentApp = apps.length === 0 ? initializeApp(config) : apps[0] ?? undefined;
        return {
            getFirestore: jest.fn(() => getFirestore(currentApp)),
            FieldValue,
            Timestamp,
            Transaction,
            DocumentReference,
        }
    });
    jest.doMock('firebase-admin/auth', () => {
        const apps = getApps();
        const currentApp = apps.length === 0 ? initializeApp(config) : apps[0] ?? undefined;
        return {
            getAuth: jest.fn(() => getAuth(currentApp)),
        }
    });
    jest.doMock('firebase-admin/app', () => ({
        initializeApp: jest.fn(() => initializeApp(config)),
        getApps: jest.fn(() => getApps()),
    }));
};
