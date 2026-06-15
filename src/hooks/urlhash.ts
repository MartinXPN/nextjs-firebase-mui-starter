import {useEffect, useState} from "react";


export function useUrlHash(interval: number) {
    const [hash, setHash] = useState<string>('');

    // A dirty trick to listen for URL hash changes
    useEffect(() => {
        const intervalId = setInterval(() => {
            if( window.location.hash !== hash )
                setHash(window.location.hash);
        }, interval);

        // Clear interval at the end of the effect
        return () => clearInterval(intervalId);
    }, [interval, hash, setHash]);
    return hash;
}
