import {memo} from "react";
import Grid from "@mui/material/Grid";
import Link from "@/components/Link";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

function SocialLinks({fontSize, htmlColor}: {fontSize: 'inherit' | 'large' | 'medium' | 'small', htmlColor?: string}) {
    return <>
        <Grid container justifyContent="center" alignContent="center" alignItems="center" columnSpacing={2} color="primary">
            <Grid item><Link href="https://youtube.com/@profound.academy" target="_blank" rel="noopener noreferrer" aria-label="Youtube"><YouTubeIcon fontSize={fontSize} htmlColor={htmlColor} /></Link></Grid>
            <Grid item><Link href="https://www.instagram.com/profound.academy.inc" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon fontSize={fontSize} htmlColor={htmlColor} /></Link></Grid>
            <Grid item><Link href="https://www.facebook.com/profound.academy.inc" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FacebookIcon fontSize={fontSize} htmlColor={htmlColor} /></Link></Grid>
            <Grid item><Link href="https://linkedin.com/company/profound-academy-inc" target="_blank" rel="noopener noreferrer" aria-label="Linkedin"><LinkedInIcon fontSize={fontSize} htmlColor={htmlColor} /></Link></Grid>
        </Grid>
    </>
}

export default memo(SocialLinks);
