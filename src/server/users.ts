import {cache} from "react";
import adminDb from "./admin-db";
import type {UserInfo} from "models/users";


export const getUser = cache(async (userId: string): Promise<UserInfo | null> => {
    const user = (await adminDb.user(userId).get()).data();
    console.log('Got user:', user);
    return user ?? null;
});
