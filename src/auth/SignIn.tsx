import Typography from "@mui/material/Typography";
import {EmailAuthProvider, GoogleAuthProvider} from 'firebase/auth';
import {AuthContext} from "@/auth/AuthContext";
import {memo, useContext} from "react";
import dynamic from "next/dynamic";

const FirebaseAuth = dynamic(() => import('./FirebaseAuth'));

// Configure FirebaseUI.
const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
        {
            provider: EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true,
        },
    ],
    credentialHelper: 'none',
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
    },
};


function SignIn({alwaysShow}: {alwaysShow?: boolean}) {
    const auth = useContext(AuthContext);
    if (!auth?.isSignedIn || alwaysShow) {
        return <>
            <div style={{left: '50%', textAlign: 'center'}}>
                <Typography variant="h6">Sign in to continue</Typography>
                <FirebaseAuth uiCallback={ui => ui.disableAutoSignIn()} uiConfig={uiConfig} />
            </div>
        </>
    }

    return <></>;
}

export default memo(SignIn);
