import {memo} from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Link from "@/components/Link";
import SocialLinks from "./SocialLinks";


function Footer() {
    return <>
        <footer>
        <Container maxWidth="xl" sx={{padding: 4}}>
            <Grid container columnSpacing={4} sx={{marginBottom: 2, justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
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
