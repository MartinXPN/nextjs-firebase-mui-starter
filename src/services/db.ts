import {collection, doc} from 'firebase/firestore';
import {firestore} from '@/firebase';
import {createFirestoreRefs} from "shared/firestore-refs";
import type {CollectionReference, DocumentReference, QueryDocumentSnapshot} from 'firebase/firestore';


// Add ids when getting the data and removing when sending it
type WithId = { id: string };
const converter = <T extends WithId>() => ({
    toFirestore: ({ id: _id, ...data }: T) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => ({ ...snap.data(), id: snap.id }) as T,
});

function dataPoint<T extends WithId>(collectionPath: string): CollectionReference<T>;
function dataPoint<T extends WithId>(collectionPath: string, docPath: string): DocumentReference<T>;
function dataPoint<T extends WithId>(collectionPath: string, docPath?: string) {
    const res = collection(firestore, collectionPath).withConverter(converter<T>());
    return docPath ? doc(res, docPath) : res;
}


export const db = {
    ...createFirestoreRefs<'web'>(dataPoint),
    firestore,
} as const;

export default db;
