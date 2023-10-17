import {collection, doc} from 'firebase/firestore';
import {CollectionReference, DocumentReference, QueryDocumentSnapshot} from 'firebase/firestore';

import {UserInfo} from "models/users";
import {firestore} from '@/firebase';

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
    const res = collection(firestore, collectionPath).withConverter(converter<T>());
    return docPath ? doc(res, docPath) : res;
}


const db = {
    users: dataPoint<UserInfo>('users'),
    user: (userId: string) => dataPoint<UserInfo>('users', userId),
} as const;

export {db};
