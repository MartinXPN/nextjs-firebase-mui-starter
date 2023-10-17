import Image from 'next/image'
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@/components/Link";
import Box from "@mui/material/Box";

export default function Page() {
    return <>
        <main>
            <Typography textAlign="center" variant="h1">
                Next.js + Firebase + MUI Starter Project
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center" padding={8}>
                <Image src="/next.svg" alt="Next.js Logo" width={180} height={37} priority/>
            </Box>

            <Container maxWidth="md">
                <Typography fontWeight="bold">
                    - Find the source code on <Link href="https://github.com/MartinXPN/nextjs-firebase-mui-starter">GitHub</Link>.
                </Typography>
                <Typography fontWeight="bold">
                    - Edit and modify the source code to fit your needs.
                </Typography>
                <Typography fontWeight="bold">
                    - Star the project on GitHub if you like it.
                </Typography>
            </Container>
        </main>
    </>
}
