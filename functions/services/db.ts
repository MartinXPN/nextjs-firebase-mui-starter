import {getApps, initializeApp, applicationDefault} from 'firebase-admin/app';
import {CollectionReference, DocumentReference, getFirestore, QueryDocumentSnapshot} from 'firebase-admin/firestore';

import {UserInfo} from '../models/users';
import {EmailQueue} from '../models/emails';


// Initialize only once
if (getApps().length === 0)
    initializeApp({credential: applicationDefault()});
const firestore = getFirestore();
firestore.settings({ignoreUndefinedProperties: true});

// Add ids when getting the data and removing when sending it
const converter = <T>() => ({
    toFirestore: (data: T) => {
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {id, ...res} = data;
        return res;
    },
    fromFirestore: (snap: QueryDocumentSnapshot) => Object.assign(snap.data(), {id: snap.id}) as unknown as T,
});

function dataPoint<T>(collectionPath: string): CollectionReference<T>;
function dataPoint<T>(collectionPath: string, docPath: string): DocumentReference<T>;
// eslint-disable-next-line require-jsdoc
function dataPoint<T>(collectionPath: string, docPath?: string) {
    const res = firestore.collection(collectionPath).withConverter(converter<T>());
    return docPath ? res.doc(docPath) : res;
}


/* eslint-disable max-len, @typescript-eslint/explicit-module-boundary-types */
const db = {
    users: dataPoint<UserInfo>('users'),
    user: (userId: string) => dataPoint<UserInfo>('users', userId),
    emailQueue: dataPoint<EmailQueue>('emailQueue'),
};
/* eslint-enable max-len, @typescript-eslint/explicit-module-boundary-types */
export {db};
