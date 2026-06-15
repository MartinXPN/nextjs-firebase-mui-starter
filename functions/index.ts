import {onRequest} from 'firebase-functions/https';
import {onDocumentCreated} from 'firebase-functions/firestore';
import {onSchedule} from 'firebase-functions/scheduler';
import {getApps, initializeApp, applicationDefault} from 'firebase-admin/app';


if (getApps().length === 0)
    initializeApp({credential: applicationDefault()});


// HTTPS functions are hosted at https://REGION-PROJECT_ID.cloudfunctions.net/FUNCTION_NAME
export const hello = onRequest({
    maxInstances: 1,
    invoker: 'public',
}, (req, res) => {
    console.log('Hello logs!');
    res.send('Hello from Firebase!');
});

export const onUserCreated = onDocumentCreated({
    document: 'users/{userId}',
    maxInstances: 10,
}, async (event) => {
    const {setupWelcomeSequence} = await import('./services/emails');
    console.log(`onUserCreated: ${event.params.userId} -> ${event?.data?.data()} => setting up welcome sequence`);
    await setupWelcomeSequence(event.params.userId);
});

export const scheduledEmailSend = onSchedule({
    schedule: 'every minute',
    timeoutSeconds: 540,
    memory: '1GiB',
}, async () => {
    const {sendScheduledEmails} = await import('./services/emails');
    return sendScheduledEmails();
});
