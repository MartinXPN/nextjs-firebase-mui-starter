import UserPage from '@/components/user/UserPage';

const Page = ({params: {userId}}: {
    params: { userId: string}
}) => {
    return <UserPage userId={userId} />
}

export default Page;
