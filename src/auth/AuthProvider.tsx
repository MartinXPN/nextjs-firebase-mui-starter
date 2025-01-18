'use client';

import {ReactNode, useCallback, useState} from "react";
import {AuthContext, AuthUser} from "./AuthContext";
import type {User as FirebaseUser} from "firebase/auth";
import {updateUserInfo} from "@/services/users";
import {getAnalytics, setUserId} from "firebase/analytics";
import {useRouter} from "next/navigation";
import useAsyncEffect from "use-async-effect";


function AuthProvider({defaultUser, children}: { defaultUser: AuthUser | null, children: ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<AuthUser | null>(defaultUser);

    const handleIdTokenChanged = useCallback(async (firebaseUser: FirebaseUser | null) => {
        const providerData = firebaseUser?.providerData && firebaseUser.providerData[0];
        console.log('token changed:', firebaseUser);
        console.log('providerData:', providerData);
        if (firebaseUser && firebaseUser.uid === user?.id && firebaseUser.emailVerified === user?.emailVerified)
            return setUser(user => {
                if (!user) return null;
                // Set sign in provider as `next-firebase-auth-edge` doesn't load it from cookies
                return {...user, signInProvider: providerData?.providerId || null};
            });

        // No user => log out the current one or do nothing if there is no current user
        if (!firebaseUser) {
            console.log('No firebase user... Logging out...');
            if (!user)
                return null;
            console.log('logging out...');
            setUser(null);
            await fetch('/api/logout', {method: 'GET'});
            return router.refresh();
        }

        console.log(`Setting the user... ${user?.id} -> ${firebaseUser.uid}`);
        const tokenResult = await firebaseUser.getIdTokenResult();
        console.log('tokenResult:', tokenResult);
        const login = await fetch('/api/login', {method: 'GET', headers: {Authorization: `Bearer ${tokenResult.token}`}});
        console.log(`login: ${login.status} ${login.statusText} ${await login.text()}`);
        if (login.status !== 200) {
            console.error('Failed to log in... Logging out instead');
            const {getAuth} = await import('firebase/auth');
            await getAuth().signOut();
            await fetch('/api/logout', {method: 'GET'});
            return router.refresh();
        }

        // Update the current user
        setUser({
            id: firebaseUser.uid,
            displayName: firebaseUser.displayName || providerData?.displayName || firebaseUser.email || null,
            email: firebaseUser.email || null,
            emailVerified: firebaseUser.emailVerified || false,
            photoURL: firebaseUser.photoURL || null,
            claims: tokenResult.claims,
            signInProvider: providerData?.providerId || null,
            phoneNumber: firebaseUser.phoneNumber || null,
        });

        console.log('Updating the page...');
        router.refresh();
    }, [router, user?.emailVerified, user?.id, setUser]);


    useAsyncEffect(async () => {
        const {getAuth, onIdTokenChanged} = await import('firebase/auth');
        const auth = getAuth();
        return onIdTokenChanged(auth, handleIdTokenChanged);
    }, unsubscribe => unsubscribe && unsubscribe(), [handleIdTokenChanged]);


    useAsyncEffect(async () => {
        if( user?.id )
            await updateUserInfo(user.id, user.displayName ?? undefined, user.photoURL ?? undefined);

        setUserId(getAnalytics(), user?.id ?? null);
    }, [user?.id, user?.displayName, user?.photoURL]);

    const isVerified = Boolean(
        user && user.signInProvider && (user.emailVerified || user.signInProvider !== 'password')
    );
    // console.log('isVerified:', isVerified, user?.emailVerified, user?.signInProvider);

    return <>
        <AuthContext.Provider value={{
            isSignedIn: isVerified && !!user?.id,
            currentUser: isVerified ? user : null,
            currentUserId: isVerified ? user?.id ?? null : null,
        }}>
            {children}
        </AuthContext.Provider>
    </>
}

export default AuthProvider;
