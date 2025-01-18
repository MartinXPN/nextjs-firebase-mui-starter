import {memo, MouseEvent, useCallback, useContext, useState} from 'react';
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Menu from '@mui/material/Menu';
import {AuthContext} from "@/auth/AuthContext";
import Link from "@/components/Link";
import {ColorModeContext} from "@/theme/ColorModeContext";
import SignIn from "@/auth/SignIn";


export function AppBarProfile() {
    const auth = useContext(AuthContext);
    const {mode, setMode} = useContext(ColorModeContext);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [showLanguageOptions, setShowLanguageOptions] = useState(false);
    const open = Boolean(anchorEl);

    const handleMenu = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => {
        setShowLanguageOptions(false);
        setAnchorEl(null);
    }

    const onSignOutClicked = async () => {
        const {getAuth} = await import('firebase/auth');
        handleClose();
        await getAuth().signOut();
    }
    const onUserProfileClicked = useCallback(() => handleClose(), []);
    const toggleAppMode = () => setMode(mode === 'light' ? 'dark' : 'light');

    return <>
        <IconButton onClick={handleMenu} edge="end" size="large" aria-label="Profile Menu">
            {auth.currentUser ? <Avatar src={auth.currentUser.photoURL ?? undefined} alt={auth.currentUser.displayName ?? ''} /> : <Avatar/>}
        </IconButton>

        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{paper: {
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.24))',
                    minWidth: '10em',
                },
            }}}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>

            {!auth.isSignedIn && !showLanguageOptions && <MenuList
                onKeyDown={e => e.stopPropagation()}
                autoFocusItem={open}
                id="menu-list-grow"
                style={{width: '20em'}}>
                    <SignIn />
                </MenuList>
            }

            {auth.isSignedIn && !showLanguageOptions && <MenuItem
                onClick={onUserProfileClicked} key="user-profile"
                component={Link} href={`/users/${auth.currentUserId}`}>
                <ListItemIcon><AccountCircleIcon fontSize="medium" /></ListItemIcon>
                <ListItemText>Profile</ListItemText>
            </MenuItem>}

            {!showLanguageOptions && <MenuItem onClick={toggleAppMode} key="app-mode">
                <ListItemIcon><DarkModeIcon fontSize="medium" /></ListItemIcon>
                <ListItemText sx={{marginRight: 2}}>Dark Mode</ListItemText>
                <ListItemIcon><Switch checked={mode === 'dark'} /></ListItemIcon>
            </MenuItem>}

            {auth.isSignedIn && !showLanguageOptions && <MenuItem onClick={onSignOutClicked} key="sign-out">
                <ListItemIcon><ExitToAppIcon fontSize="medium" /></ListItemIcon>
                <ListItemText>Logout</ListItemText>
            </MenuItem>}
        </Menu>
    </>
}

export default memo(AppBarProfile);
