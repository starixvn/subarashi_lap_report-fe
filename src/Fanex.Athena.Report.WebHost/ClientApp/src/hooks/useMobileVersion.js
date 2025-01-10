import { useRef } from 'react';
import { isDesktop } from 'react-device-detect';
import { useIsFirstRender } from 'usehooks-ts';

export const useMobileVersion = () => {
    const width = window.innerWidth;
    const ref = useRef(false);
    const isFirstRender = useIsFirstRender();
    if (isFirstRender) {
        if (isDesktop) {
            ref.current = false;
        } else {
            ref.current = width < 1024;
        }
    }

    return ref.current;
};

export default useMobileVersion;
