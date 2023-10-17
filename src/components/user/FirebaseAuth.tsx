import {useEffect, useRef, useState} from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import useAsyncEffect from "use-async-effect";
import {EmailAuthProvider, onAuthStateChanged, sendEmailVerification} from 'firebase/auth';
import 'firebaseui/dist/firebaseui.css';
import {auth} from "firebaseui";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

interface Props {
    // The Firebase UI Web UI Config object.
    // See: https://github.com/firebase/firebaseui-web#configuration
    uiConfig: auth.Config;
    // Callback that will be passed the FirebaseUi instance before it is
    // started. This allows access to certain configuration options such as
    // disableAutoSignIn().
    uiCallback?(ui: auth.AuthUI): void;
    // The Firebase App auth instance to use.
    firebaseAuth: any; // As firebaseui-web
    className?: string;
}


const FirebaseAuth = ({uiConfig, firebaseAuth, className, uiCallback}: Props) => {
    const [firebaseui, setFirebaseui] = useState<typeof import('firebaseui') | null>(null);
    const [userSignedIn, setUserSignedIn] = useState(false);
    const [isVerified, setIsVerified] = useState(true);
    const [loading, setLoading] = useState(true);
    const elementRef = useRef(null);

    useAsyncEffect(async () => {
        // Firebase UI only works on the Client. So we're loading the package only after
        // the component has mounted, so that this works when doing server-side rendering.
        setFirebaseui(await import('firebaseui'));
    }, []);


    useEffect(() => {
        if (firebaseui === null )
            return;

        // Get or Create a firebaseUI instance.
        const firebaseUiWidget = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebaseAuth);
        if (uiConfig.signInFlow === 'popup')
            firebaseUiWidget.reset();

        // We track the auth state to reset firebaseUi if the user signs out.
        const unregisterAuthObserver = onAuthStateChanged(firebaseAuth, user => {
            if (!user && userSignedIn)
                firebaseUiWidget.reset();
            if( user && user.providerData?.[0]?.providerId === EmailAuthProvider.PROVIDER_ID && !user.emailVerified ) {
                sendEmailVerification(user).then(() => console.log('Email verification sent!'));
                firebaseUiWidget.reset();
            }
            setIsVerified(!!user?.emailVerified);
            setUserSignedIn(!!user);
        });

        // Trigger the callback if any was set.
        if (uiCallback)
            uiCallback(firebaseUiWidget);

        // Render the firebaseUi Widget.
        // @ts-ignore
        firebaseUiWidget.start(elementRef.current, {...uiConfig, callbacks: {uiShown() {
            setLoading(false);
        }}});

        return () => {
            unregisterAuthObserver();
            firebaseUiWidget.reset();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firebaseui, uiConfig]);

    return <div className={className} ref={elementRef}>
        {loading && <CircularProgress />}
        {userSignedIn && !isVerified && <Box paddingX={1}>
            <Typography marginTop={2} color="error" fontWeight="bold">Please verify your email to continue</Typography>
            <Typography marginBottom={4} color="text.secondary">Open your the mail we sent you and click the link to verify your account.</Typography>
            <Divider />
        </Box>}
    </div>
};

export default FirebaseAuth;
