import {memo} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@/components/Link";


function AppBarHome({onClick}: {onClick?: () => any}) {
    return <>
        <Button onClick={onClick} component={Link} href="/" color="inherit" size="large" sx={{textTransform: 'none', marginRight: 2}}>
            <Typography fontWeight="bold" sx={{ml: 1}} noWrap>Next.js</Typography>
            <Typography fontWeight="bold" sx={{display: {xs: 'none', sm: 'flex'}}} noWrap>&nbsp;+ Firebase + MUI</Typography>
        </Button>
    </>
}

export default memo(AppBarHome);
