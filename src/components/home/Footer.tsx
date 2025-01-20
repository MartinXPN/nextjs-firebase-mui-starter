import {memo} from "react";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import Link from "@/components/Link";
import SocialLinks from "./SocialLinks";


function Footer() {
    return <>
        <footer>
        <Container maxWidth="xl" sx={{padding: 4}}>
            <Grid container justifyContent="center" alignContent="center" alignItems="center" columnSpacing={4} marginBottom={2}>
                <Grid><Link href="/teach">Teach</Link></Grid>
                <Grid><Link href="/pricing">Pricing</Link></Grid>
                <Grid><Link href="/faq">FAQ</Link></Grid>
                <Grid><Link href="/about">About</Link></Grid>
                <Grid><Link href="/privacy">Privacy Policy</Link></Grid>
                <Grid><Link href="/terms">Terms and Conditions</Link></Grid>
            </Grid>

            <SocialLinks fontSize="medium" />
        </Container>
        </footer>
    </>
}

export default memo(Footer);
