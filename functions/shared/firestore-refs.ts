import type {
    CollectionReference as CollectionReferenceWeb,
    DocumentReference as DocumentReferenceWeb,
} from 'firebase/firestore';
import type {
    CollectionReference as CollectionReferenceAdmin,
    DocumentReference as DocumentReferenceAdmin,
} from 'firebase-admin/firestore';

import {UserInfo} from '../models/users';
import {EmailQueue} from '../models/emails';

/* eslint-disable max-len, @typescript-eslint/explicit-module-boundary-types */
type DbRuntime = 'web' | 'admin';
type CollectionReference<Runtime extends DbRuntime, T> = Runtime extends 'web' ? CollectionReferenceWeb<T> : CollectionReferenceAdmin<T>;
type DocumentReference<Runtime extends DbRuntime, T> = Runtime extends 'web' ? DocumentReferenceWeb<T> : DocumentReferenceAdmin<T>;
type DataPoint<Runtime extends DbRuntime> = {
    <T>(collectionPath: string): CollectionReference<Runtime, T>;
    <T>(collectionPath: string, docPath: string): DocumentReference<Runtime, T>;
};

export const createFirestoreRefs = <Runtime extends DbRuntime>(dataPoint: DataPoint<Runtime>) => ({
    users: dataPoint<UserInfo>('users'),
    user: (userId: string) => dataPoint<UserInfo>('users', userId),
    emailQueue: dataPoint<EmailQueue>('emailQueue'),
});
/* eslint-enable max-len, @typescript-eslint/explicit-module-boundary-types */
