'use client';

import {memo, useContext, useEffect, useState} from "react";
import {UserInfo as User} from "models/users";
import {onUserInfoChanged} from "@/services/users";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import {styled} from "@mui/material/styles";
import Edit from "@mui/icons-material/Edit";
import {AuthContext} from "@/auth/AuthContext";
import ProfileEditor from "@/components/user/ProfileEditorForm";


const UserInfoRoot = styled(Box)({
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    overflow: 'hidden',
    marginTop: '4em',
});

const UserInfoContents = styled(Box)({
    width: 600,
    maxWidth: '95%',
    minHeight: 150,
    flex: 'left',
    display: 'flex',
    flexDirection: 'row',
    gap: '3em',
});


function UserImage({user}: {user: User}) {
    const auth = useContext(AuthContext);

    return <Stack direction="column">
        <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            invisible={auth.currentUserId !== user.id}>

            <Avatar
                src={user.imageUrl}
                sx={{width: 150, height: 150, border: '2px solid lightgray'}} />
        </Badge>
    </Stack>
}

function UserName({user}: {user: User}) {
    const auth = useContext(AuthContext);
    const [editing, setEditing] = useState(false);
    const onEditClicked = () => setEditing(true);
    const onCancelClicked = () => setEditing(false);

    return <Stack direction="row" alignItems="top" alignContent="top" paddingTop="10px" spacing={2}>
        {!editing && <Typography variant="h4" fontWeight="bold" width={200} overflow="hidden" display="-webkit-box" sx={{WebkitBoxOrient: 'vertical', WebkitLineClamp: 2}}>{user.displayName}</Typography>}
        {!editing && auth.currentUserId === user.id && <Box><IconButton color="inherit" onClick={onEditClicked}><Edit /></IconButton></Box>}
        {editing && <ProfileEditor user={user} stopEditing={onCancelClicked} />}
    </Stack>
}


function UserPage({initialUser}: {initialUser: User | null}) {
    const [user, setUser] = useState<User | null>(initialUser);

    useEffect(() => {
        if( initialUser?.id )
            return onUserInfoChanged(initialUser?.id, user => setUser(user));
    }, [initialUser?.id]);

    return <>
        <UserInfoRoot>
            <UserInfoContents>
                {user ? <>
                        <UserImage user={user} />
                        <UserName user={user} />
                    </> :
                    <Box sx={{width: 150, height: 150, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CircularProgress/>
                    </Box>
                }
            </UserInfoContents>
        </UserInfoRoot>
    </>
}

export default memo(UserPage);
