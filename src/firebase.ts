'use client';
import {getApp, getApps, initializeApp} from "firebase/app";
import {initializeFirestore, getFirestore} from "firebase/firestore";
import prodConfig from "@/firebase-config";
import type {FirebaseApp} from "firebase/app";
import type {Firestore} from "firebase/firestore";

export let app: FirebaseApp, firestore: Firestore;
if (!getApps().length) {
    app = initializeApp(prodConfig);
    firestore = initializeFirestore(app, {ignoreUndefinedProperties: true});
    console.log('Initialized client firestore to ignore undefined properties', firestore.type);
}
else {
    app = getApp();
    firestore = getFirestore(app);
}
