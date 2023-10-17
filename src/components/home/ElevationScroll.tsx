import {ReactElement, cloneElement, memo} from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';


function ElevationScroll({children}: {children: ReactElement}) {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    return cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

export default memo(ElevationScroll);
