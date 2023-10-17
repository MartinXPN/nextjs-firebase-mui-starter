'use client';

import {memo, ReactNode} from "react";
import ProfileAppBar from "@/components/user/ProfileAppBar";
import Footer from "@/components/home/Footer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

function AppLayout({children, appBarColor}: {
    children: ReactNode, appBarColor?: string,
}) {
    return <>
        <ProfileAppBar color={appBarColor} />
        <Box minHeight="100vh">
            {children}
        </Box>
        <Divider />
        <Footer />
    </>
}

export default memo(AppLayout);
