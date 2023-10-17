import {AppBar, Box, Container, Toolbar} from '@mui/material';
import {AppBarProfile} from "./Auth";
import AppBarHome from "@/components/home/AppBarHome";
import ElevationScroll from "@/components/home/ElevationScroll";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "@/components/Link";
import ListItemIcon from "@mui/material/ListItemIcon";
import ViewList from "@mui/icons-material/ViewList";
import ListItemText from "@mui/material/ListItemText";
import Sell from "@mui/icons-material/Sell";
import SchoolIcon from '@mui/icons-material/School';
import Info from "@mui/icons-material/Info";
import Button from "@mui/material/Button";
import {MouseEvent, useState} from "react";

export default function ProfileAppBar({color}: {color?: string}) {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);

    return <>
        <ElevationScroll>
        <AppBar color={color === 'home' ? 'inherit' : 'transparent'}
                sx={{bgcolor: color === 'home' ? 'background.default' : 'background.paper'}}>
        <Container maxWidth="xl">
        <nav>
        <Toolbar>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton size="large" onClick={handleOpenNavMenu} color="inherit" aria-label="Navigation Menu">
                    <MenuIcon />
                </IconButton>
                <Menu anchorEl={anchorElNav} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                      keepMounted transformOrigin={{vertical: 'top', horizontal: 'left'}}
                      open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}
                      sx={{display: { xs: 'block', md: 'none' }}}>

                    <MenuItem key="pricing" component={Link} href="/#pricing" scroll={false} onClick={handleCloseNavMenu}>
                        <ListItemIcon><Sell/></ListItemIcon>
                        <ListItemText>Pricing</ListItemText>
                    </MenuItem>
                    <MenuItem key="about" component={Link} href="/about" onClick={handleCloseNavMenu}>
                        <ListItemIcon><Info/></ListItemIcon>
                        <ListItemText sx={{marginRight: 10}}>About</ListItemText>
                    </MenuItem>
                </Menu>
            </Box>

            <AppBarHome />
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button component={Link} href="/#pricing" scroll={false} size="large" color="inherit" sx={{textTransform: 'none'}}>Pricing</Button>
                <Button component={Link} href="/about" size="large" color="inherit" sx={{textTransform: 'none'}}>About</Button>
            </Box>

            <Box flexGrow={1} />
            <AppBarProfile />
        </Toolbar>
        </nav>
        </Container>
        </AppBar >
        </ElevationScroll>

        <Toolbar sx={{height: '64px'}} /> {/* To place the content under the toolbar */}
    </>
}
