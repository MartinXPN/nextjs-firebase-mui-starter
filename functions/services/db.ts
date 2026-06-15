import {getApps, initializeApp, applicationDefault} from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';
import {createFirestoreRefs} from '../shared/firestore-refs';
import type {CollectionReference, DocumentReference, QueryDocumentSnapshot} from 'firebase-admin/firestore';

// Initialize only once
if (getApps().length === 0)
    initializeApp({credential: applicationDefault()});
const firestore = getFirestore();
firestore.settings({ignoreUndefinedProperties: true});

// Add ids when getting the data and removing when sending it
type WithId = { id: string };
const converter = <T extends WithId>() => ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toFirestore: ({id: _id, ...data}: T) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => ({...snap.data(), id: snap.id}) as T,
});

function dataPoint<T extends WithId>(collectionPath: string): CollectionReference<T>;
function dataPoint<T extends WithId>(collectionPath: string, docPath: string): DocumentReference<T>;
// eslint-disable-next-line
function dataPoint<T extends WithId>(collectionPath: string, docPath?: string) {
    const res = firestore.collection(collectionPath).withConverter(converter<T>());
    return docPath ? res.doc(docPath) : res;
}


/* eslint-disable max-len, @typescript-eslint/explicit-module-boundary-types */
export const db = {
    ...createFirestoreRefs<'admin'>(dataPoint),
};
/* eslint-enable max-len, @typescript-eslint/explicit-module-boundary-types */
