'use client';

import {memo, ReactNode} from "react";
import ProfileAppBar from "@/components/user/ProfileAppBar";
import Footer from "@/components/home/Footer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

function AppLayout({children}: {
    children: ReactNode,
}) {
    return <>
        <ProfileAppBar />
        <Box minHeight="100vh">
            {children}
        </Box>
        <Divider />
        <Footer />
    </>
}

export default memo(AppLayout);
