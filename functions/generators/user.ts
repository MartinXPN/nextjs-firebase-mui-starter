import {faker} from '@faker-js/faker';
import {CreateRequest} from "firebase-admin/auth";
import {UserInfo} from "../models/users";

export const genUserInfo = (overrides: Partial<UserInfo> = {}): UserInfo => {
    return <UserInfo>{
        id: faker.string.uuid(),
        imageUrl: faker.image.url(),
        displayName: faker.person.fullName(),
        ...overrides,
    }
};

export const genFirebaseUser = (overrides: Partial<CreateRequest> = {}): CreateRequest => {
    return <CreateRequest>{
        uid: faker.string.uuid(),
        email: faker.internet.email().toLowerCase(),
        emailVerified: true,
        password: faker.internet.password(),
        displayName: faker.person.fullName(),
        photoURL: faker.image.url(),
        ...overrides,
    }
}
