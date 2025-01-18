import UserPage from '@/components/user/UserPage';
import {getUser} from "@/server/users";

const Page = async ({params}: {
    params: Promise<{ userId: string }>,
}) => {
    const {userId} = await params;
    const user = await getUser(userId);
    console.log('Server user:', user);
    return <UserPage initialUser={user} />
}

export default Page;
