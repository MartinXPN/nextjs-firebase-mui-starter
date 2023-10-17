import Image from 'next/image'
import Container from "@mui/material/Container";

export default function Page() {
    return <>
        <main>
            <Container maxWidth="sm">
                <Image src="/next.svg" alt="Next.js Logo" width={180} height={37} priority/>
            </Container>
        </main>
    </>
}
