import { useState, useEffect } from "react";

function detectOS(): 'macOS' | 'Windows' | 'iOS' | 'Android' | 'Linux' | 'Unknown' {
    if (typeof window === 'undefined' || typeof navigator === 'undefined')
        return 'Unknown';

    const userAgent = window.navigator.userAgent.toLowerCase();
    const macPlatforms = /(macintosh|macintel|macppc|mac68k|macos|macosx)/i;
    const windowsPlatforms = /(win32|win64|windows|wince)/i;
    const iosPlatforms = /(iphone|ipad|ipod)/i;
    const androidPlatforms = /(android)/i;
    const linuxPlatforms = /(linux)/i;
    
    if (macPlatforms.test(userAgent))       return 'macOS';
    if (windowsPlatforms.test(userAgent))   return 'Windows';
    if (iosPlatforms.test(userAgent))       return 'iOS';
    if (androidPlatforms.test(userAgent))   return 'Android';
    if (linuxPlatforms.test(userAgent))     return 'Linux';
    return 'Unknown';
}

export function useOS() {
    const [os, setOS] = useState(() => detectOS());

    // update if the user agent changes
    useEffect(() => {
        const handleResize = () => setOS(detectOS());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return os;
}
