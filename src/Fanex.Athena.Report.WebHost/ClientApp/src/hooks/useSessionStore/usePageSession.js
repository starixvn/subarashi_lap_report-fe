import { useEffect } from 'react';

import { LRF_SAVED_PAGE_HASH_KEY, LRF_SAVED_PAGE_SESSION_KEY } from '@/constants/config';
import Site from '@/lib/site';

const usePageSession = () => {
    const pathName = window.location.pathname;

    useEffect(() => {
        const onPageHideEvent = () => {
            if (window.location.pathname === pathName && window.location.hash === LRF_SAVED_PAGE_HASH_KEY) {
                sessionStorage.removeItem(LRF_SAVED_PAGE_SESSION_KEY);
                sessionStorage.removeItem(Site.getLrfSavedSessionKey(pathName));
            }
        };

        window.addEventListener('pagehide', onPageHideEvent);

        return () => {
            window.removeEventListener('pagehide', onPageHideEvent);
        };
    }, []);

    return pathName;
};

export default usePageSession;
