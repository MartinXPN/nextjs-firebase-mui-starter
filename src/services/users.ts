import {getDoc, onSnapshot, setDoc} from "firebase/firestore";
import {getAuth, updateProfile} from 'firebase/auth';

import {db} from "./db";
import {UserInfo} from "models/users";


export const onUserInfoChanged = (userId: string, onChanged: (user: UserInfo | null) => void) => {
    return onSnapshot(db.user(userId), snapshot => {
        const user = snapshot.data();
        console.log('Got user info:', user);
        onChanged(user ?? null);
    });
}


export const updateUserInfo = async (userId: string, displayName?: string, imageUrl?: string) => {
    const user = getAuth().currentUser;
    if( !user )
        return;

    // Update auth profile
    if( user.displayName !== displayName || (imageUrl && user.photoURL !== imageUrl) ) {
        await updateProfile(user, {displayName: displayName, photoURL: imageUrl});
    }

    // Immediate update only if needed (updates are more expensive than reads)
    const userInfo = (await getDoc(db.user(userId))).data();
    if( userInfo?.displayName !== displayName || (imageUrl && userInfo?.imageUrl !== imageUrl) ) {
        console.log(`Setting ${userId} info to ${displayName} ${imageUrl}`);
        await setDoc(db.user(userId), {displayName: displayName, imageUrl: imageUrl}, {merge: true});
    }
}
