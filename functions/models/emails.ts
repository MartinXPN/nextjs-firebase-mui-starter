import {Timestamp} from 'firebase/firestore';

export interface EmailQueue {
    id: string;
    to: string;
    from: string;
    subject: string;
    template: string;
    data: any;
    sendAt: Timestamp;
}
