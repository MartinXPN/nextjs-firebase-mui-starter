import {cert, getApps, getApp, initializeApp} from 'firebase-admin/app';
import {getFirestore, initializeFirestore} from 'firebase-admin/firestore';
import {createFirestoreRefs} from "shared/firestore-refs";
import type {App} from 'firebase-admin/app';
import type {Firestore, CollectionReference, DocumentReference, QueryDocumentSnapshot} from 'firebase-admin/firestore';

let app: App, firestore: Firestore;
if( getApps().length === 0 ) {
    app = initializeApp({
        credential: cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
            clientEmail: process.env.PRIVATE_FIREBASE_CLIENT_EMAIL!,
            // Using JSON to handle newline problems when storing the key as a secret in Vercel:
            // https://github.com/vercel/vercel/issues/749#issuecomment-707515089
            privateKey: process.env.PRIVATE_FIREBASE_PRIVATE_KEY
                ? JSON.parse(process.env.PRIVATE_FIREBASE_PRIVATE_KEY)
                : undefined,
        }),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL!,
    });
    firestore = initializeFirestore(app);
    firestore.settings({ignoreUndefinedProperties: true});
    console.log('Initialized server-side firestore to ignore undefined properties');
}
else {
    app = getApp();
    firestore = getFirestore(app);
}

// Add ids when getting the data and removing when sending it
type WithId = { id: string };
const converter = <T extends WithId>() => ({
    toFirestore: ({ id: _id, ...data }: T) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => ({ ...snap.data(), id: snap.id }) as T,
});

function dataPoint<T extends WithId>(collectionPath: string): CollectionReference<T>;
function dataPoint<T extends WithId>(collectionPath: string, docPath: string): DocumentReference<T>;
function dataPoint<T extends WithId>(collectionPath: string, docPath?: string) {
    const res = firestore.collection(collectionPath).withConverter(converter<T>());
    return docPath ? res.doc(docPath) : res;
}


export const db = {
    ...createFirestoreRefs<'admin'>(dataPoint),
    firestore,
};

export default db;
