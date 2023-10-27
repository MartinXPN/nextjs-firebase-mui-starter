import {cert, getApps, initializeApp} from 'firebase-admin/app';
import {CollectionReference, DocumentReference, getFirestore, QueryDocumentSnapshot} from 'firebase-admin/firestore';

import {UserInfo} from "models/users";

// TODO: find a way to share the DB between firebase-functions / server / client
if( getApps().length === 0 ) {
    initializeApp({
        credential: cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
            clientEmail: process.env.PRIVATE_FIREBASE_CLIENT_EMAIL!,
            // Using JSON to handle newline problems when storing the key as a secret in Vercel. See:
            // https://github.com/vercel/vercel/issues/749#issuecomment-707515089
            privateKey: JSON.parse(process.env.PRIVATE_FIREBASE_PRIVATE_KEY!),
        }),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL!,
    });
    getFirestore().settings({ignoreUndefinedProperties: true});
}
const firestore = getFirestore();


// Add ids when getting the data and removing when sending it
const converter = <T>() => ({
    toFirestore: (data: T) => {
        // @ts-ignore
        const {id, ...res} = data;
        return res;
    },
    fromFirestore: (snap: QueryDocumentSnapshot) => Object.assign(snap.data(), {id: snap.id}) as unknown as T
});

function dataPoint<T>(collectionPath: string): CollectionReference<T>;
function dataPoint<T>(collectionPath: string, docPath: string): DocumentReference<T>;
function dataPoint<T>(collectionPath: string, docPath?: string) {
    const res = firestore.collection(collectionPath).withConverter(converter<T>());
    return docPath ? res.doc(docPath) : res;
}


const db = {
    users: dataPoint<UserInfo>('users'),
    user: (userId: string) => dataPoint<UserInfo>('users', userId),
} as const;

export {db};
