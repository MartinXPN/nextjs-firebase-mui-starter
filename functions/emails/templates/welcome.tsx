import {
    Body, Container, Head, Hr, Html, Img, Preview, Section, Text, Link,
} from '@react-email/components';
import * as React from 'react';


export const WelcomeEmail = ({name}: {name?: string}) => (
    <Html>
        <Head/>
        <Preview>Welcome to Next.js + Firebase + MUI Starter Project!</Preview>
        <Body style={{
            // eslint-disable-next-line max-len
            fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
            lineHeight: '24px',
            backgroundColor: '#ffffff', // Comment this out for transparent background.
        }}>
            <Container style={{margin: 'auto'}}>
                <Img src="https://seeklogo.com/images/N/next-js-logo-8FCFF51DD2-seeklogo.com.png" alt="Next.js Logo"
                    width="50" height="50" style={{margin: 'auto'}} />

                {/* Intro */}
                <Section style={{padding: '8px'}}>
                    <Text style={{fontSize: '16px'}}>
                        Hey {name || 'there'}, welcome to Next.js + Firebase + MUI Starter!
                    </Text>
                    <Text style={{fontSize: '16px'}}>
                        You can find the source code of this project on{' '}
                        {/* eslint-disable-next-line max-len */}
                        <Link style={{color: '#fa541c'}} href="https://github.com/MartinXPN/nextjs-firebase-mui-starter">
                            GitHub
                        </Link>.
                        Feel free to use it as a starting point for your own projects.
                    </Text>
                </Section>


                {/* Footer */}
                <Section style={{padding: '8px'}}>
                    <Text style={{fontSize: '16px', whiteSpace: 'pre-line'}}>
                        {'\n'}Happy coding!{'\n\n'}Cheers,{'\n'}Martin
                    </Text>
                    <Hr style={{borderColor: 'grey'}}/>
                    <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                        Company Name, Inc.
                    </Text>
                    <Text style={{color: '#8898aa', fontSize: '12px', lineHeight: '16px', textAlign: 'center'}}>
                        Your address...
                    </Text>
                </Section>
            </Container>
        </Body>
    </Html>
);

export default WelcomeEmail;
