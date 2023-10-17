import {createContext} from "react";
import {ParsedToken} from "@firebase/auth";

export type AuthUser = {
    id: string | null;
    email: string | null;
    emailVerified: boolean;
    phoneNumber: string | null;
    displayName: string | null;
    photoURL: string | null;
    claims: ParsedToken;
    signInProvider: string | null;
}

type AuthContextProps = {
    isSignedIn: boolean;
    currentUser: AuthUser | null;
    currentUserId: string | null;
}

export const AuthContext = createContext<AuthContextProps>({
    isSignedIn: false,
    currentUser: null,
    currentUserId: null,
});
