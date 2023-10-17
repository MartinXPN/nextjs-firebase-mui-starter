import {Timestamp} from 'firebase-admin/firestore';
import {getAuth} from 'firebase-admin/auth';
import {Resend} from 'resend';
import {CreateEmailOptions} from 'resend/build/src/emails/interfaces/create-email-options.interface';
import Welcome from '../emails/templates/welcome';
import {db} from './db';
import {CreateEmailResponse} from 'resend/build/src/emails/interfaces';


interface ErrorResponse {
    statusCode: number;
    name: string;
    message: string;
}
type ResendResponse = CreateEmailResponse | ErrorResponse;


export const sendEmail = async (options: CreateEmailOptions) => {
    console.log(`sendEmail: ${options}`);
    const resend = new Resend(process.env.RESEND_API_KEY!);
    const data = await resend.sendEmail(options) as ResendResponse;
    console.log('Data after sending:', data);

    if ('statusCode' in data && data.statusCode !== 200)
        throw new Error(`Failed to send email ${data.statusCode}: ${data.message}`);

    return data;
};


export const setupWelcomeSequence = async (userId: string) => {
    const user = await getAuth().getUser(userId);
    if (!user.email)
        return console.log('No email for user:', userId);

    // Do not send if the user is authenticated with email/password and hasn't verified their email
    if (!user.emailVerified && user.providerData.some((p) => p.providerId === 'password'))
        return console.log('User has not verified their email:', userId, user.email);

    const nameParts = user.displayName?.trim()?.split(/\s+/) ?? [];
    const firstName = nameParts.length > 0 ? nameParts[0] : '';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
    console.log(`Sending to: ${userId} ${user.email} with data: ${firstName} || ${lastName}`);

    // 1. Welcome email
    const fiveMinutesFromNow = new Date();
    fiveMinutesFromNow.setMinutes(fiveMinutesFromNow.getMinutes() + 5);

    await db.emailQueue.add({
        id: `${userId}-welcome`,
        from: 'TODO <delivered@resend.dev>',
        to: user.email,
        template: 'welcome',
        subject: `Welcome to Next.js + Firebase + MUI Starter, ${firstName}!`,
        data: {
            name: firstName,
        },
        sendAt: Timestamp.fromDate(fiveMinutesFromNow),
    });

    // 2. TODO
};


export const sendScheduledEmails = async (retries: number = 10) => {
    console.log('sendScheduledEmails');
    const toSend = await db.emailQueue.where(
        'sendAt', '<=', Timestamp.fromDate(new Date())
    ).get();

    console.log(`sending ${toSend.docs.length} emails`);
    const failed: string[] = [];
    await Promise.all(toSend.docs.map(async (d) => {
        const email = d.data();
        console.log('email', email);

        // Determine the template to use
        let EmailObject = null;
        if (email.template === 'welcome')
            EmailObject = Welcome;

        if (!EmailObject)
            return console.log('Unknown template:', email.template);

        try {
            await sendEmail({
                from: email.from,
                to: email.to,
                subject: email.subject,
                react: EmailObject(email.data),
            });
        }
        catch (e) {
            console.error('Failed to send email => not removing from queue:', e);
            failed.push(d.id);
            return;
        }

        // Clean up
        return d.ref.delete();
    }));

    if (failed.length > 0 && retries > 0) {
        console.log('Retrying failed emails:', failed);
        await sendScheduledEmails(retries - 1);
    }
};
