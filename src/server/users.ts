import {cache} from "react";
import {UserInfo} from "models/users";
import {db} from "./db";


export const getUser = cache(async (userId: string): Promise<UserInfo | null> => {
    const user = (await db.user(userId).get()).data();
    console.log('Got user:', user);
    return user ?? null;
});
