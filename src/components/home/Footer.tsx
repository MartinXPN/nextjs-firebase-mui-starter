import {memo} from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Link from "@/components/Link";
import SocialLinks from "./SocialLinks";


function Footer() {
    return <>
        <footer>
        <Container maxWidth="xl" sx={{padding: 4}}>
            <Grid container justifyContent="center" alignContent="center" alignItems="center" columnSpacing={4} marginBottom={2}>
                <Grid item><Link href="/teach">Teach</Link></Grid>
                <Grid item><Link href="/pricing">Pricing</Link></Grid>
                <Grid item><Link href="/faq">FAQ</Link></Grid>
                <Grid item><Link href="/about">About</Link></Grid>
                <Grid item><Link href="/privacy">Privacy Policy</Link></Grid>
                <Grid item><Link href="/terms">Terms and Conditions</Link></Grid>
            </Grid>

            <SocialLinks fontSize="medium" />
        </Container>
        </footer>
    </>
}

export default memo(Footer);
