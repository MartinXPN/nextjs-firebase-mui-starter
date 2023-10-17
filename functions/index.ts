import * as functions from 'firebase-functions';
import {getApps, initializeApp, applicationDefault} from 'firebase-admin/app';


if (getApps().length === 0)
    initializeApp({credential: applicationDefault()});


export const helloWorld = functions.https.onRequest((req, res) => {
    console.log('Hello logs!');
    res.send('Hello from Firebase!');
});

export const onUserUpdated = functions.firestore
    .document('users/{userId}')
    .onWrite(async (change, context) => {
        const {setupWelcomeSequence} = await import('./services/emails');
        // if it's a new user
        if (!change.before.exists && change.after.exists)
            await setupWelcomeSequence(context.params.userId);
    });

export const scheduledEmailSend = functions.pubsub
    .schedule('every minute')
    .onRun(async () => {
        const {sendScheduledEmails} = await import('./services/emails');
        return sendScheduledEmails();
    });
