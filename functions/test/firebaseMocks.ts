import * as app from 'firebase-admin/app';
import * as firestore from 'firebase-admin/firestore';
import * as auth from 'firebase-admin/auth';

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
        const apps = app.getApps();
        const currentApp = apps.length === 0 ? app.initializeApp(config) : apps[0] ?? undefined;
        return {
            getFirestore: jest.fn(() => firestore.getFirestore(currentApp)),
            FieldValue: firestore.FieldValue,
            Timestamp: firestore.Timestamp,
            Transaction: firestore.Transaction,
            DocumentReference: firestore.DocumentReference,
        }
    });
    jest.doMock('firebase-admin/auth', () => {
        const apps = app.getApps();
        const currentApp = apps.length === 0 ? app.initializeApp(config) : apps[0] ?? undefined;
        return {
            getAuth: jest.fn(() => auth.getAuth(currentApp)),
        }
    });
    jest.doMock('firebase-admin/app', () => ({
        initializeApp: jest.fn(() => app.initializeApp(config)),
        getApps: jest.fn(() => app.getApps()),
    }));
};
