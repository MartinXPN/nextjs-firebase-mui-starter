'use client';

import {memo, ReactNode} from "react";
import {Roboto} from "next/font/google";
import {createTheme, ThemeProvider as MuiThemeProvider} from "@mui/material/styles";
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import CssBaseline from "@mui/material/CssBaseline";
import ColorModeContextProvider from "@/theme/ColorModeContext";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v15-appRouter";


const font = Roboto({weight: ['300', '400', '500', '700'], subsets: ['latin']});


export const theme = createTheme({
    typography: {
        fontFamily: font.style.fontFamily,
        h1: {fontSize: 42, fontWeight: 'bold', fontFamily: font.style.fontFamily},
        h2: {fontSize: 30, fontFamily: font.style.fontFamily},
        h3: {fontSize: 26, fontFamily: font.style.fontFamily},
        h4: {fontSize: 20, fontFamily: font.style.fontFamily},
        h5: {fontSize: 18, fontFamily: font.style.fontFamily},
        h6: {fontSize: 16, fontFamily: font.style.fontFamily},
        subtitle1: {fontFamily: font.style.fontFamily},
        subtitle2: {fontFamily: font.style.fontFamily},
        body1: {fontFamily: font.style.fontFamily},
        body2: {fontFamily: font.style.fontFamily},
        button: {fontFamily: font.style.fontFamily},
        caption: {fontFamily: font.style.fontFamily},
        overline: {fontFamily: font.style.fontFamily},
    },
    colorSchemes: {
        light: {
            palette: {
                background: {default: '#ffffff', paper: '#ffffff'},
                primary: {main: '#212b36'},
                secondary: {main: '#fa541c'},
                info: {main: '#f44336'},
                success: {main: '#4caf50'},
                error: {main: '#f44336'},
            },
        },
        dark: {
            palette: {
                background: {default: '#171717', paper: '#212121'},
                primary: {main: '#ffffff'},
                secondary: {main: '#fa541c'},
                info: {main: '#f44336'},
                success: {main: '#388e3c'},
                error: {main: '#d32f2f'},
            },
        },
    },
});



function ThemeProvider({children}: {children: ReactNode}) {
    return <>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <InitColorSchemeScript attribute="class" />
            <MuiThemeProvider theme={theme}>
            <ColorModeContextProvider>
                <CssBaseline />
                {children}
            </ColorModeContextProvider>
            </MuiThemeProvider>
        </AppRouterCacheProvider>
    </>
}

export default memo(ThemeProvider);
