import {createContext, memo, ReactNode} from "react";
import {useColorScheme} from "@mui/material/styles";

export type PaletteMode = 'light' | 'dark' | 'system';

interface ColorModeContextProps {
    mode: PaletteMode;
    setMode: (mode: PaletteMode) => void;
}

export const ColorModeContext = createContext<ColorModeContextProps>({
    mode: 'light',
    setMode: (_: PaletteMode) => {},
});

function ColorModeContextProvider({children}: {children: ReactNode}) {
    const {mode, setMode} = useColorScheme();

    return <ColorModeContext.Provider value={{mode: mode ?? 'light', setMode: setMode}}>
        {children}
    </ColorModeContext.Provider>
}

export default memo(ColorModeContextProvider);
