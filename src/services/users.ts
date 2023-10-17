import {getDoc, setDoc} from "firebase/firestore";
import {getAuth, updateProfile} from 'firebase/auth';

import {db} from "./db";


export const updateUserInfo = async (userId: string, displayName?: string, imageUrl?: string) => {
    const user = getAuth().currentUser;
    if( !user )
        return;

    // Add user update to the queue (updates user info across the whole app)
    if( user.displayName !== displayName || user.photoURL !== imageUrl ) {
        await updateProfile(user, {displayName: displayName, photoURL: imageUrl});
    }

    // Immediate update only if needed (updates are more expensive than reads)
    const userInfo = (await getDoc(db.user(userId))).data();
    if( userInfo?.displayName !== displayName || userInfo?.imageUrl !== imageUrl ) {
        console.log(`Setting ${userId} info to ${displayName} ${imageUrl}`);
        await setDoc(db.user(userId), {displayName: displayName, imageUrl: imageUrl}, {merge: true});
    }
}
