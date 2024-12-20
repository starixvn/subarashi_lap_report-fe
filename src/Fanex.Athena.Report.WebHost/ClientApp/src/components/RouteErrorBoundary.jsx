import { INVALID_REQUEST_URL, LRF_SAVED_PAGE_SESSION_KEY } from '@srcRoot/constants/config';
import Site from '@srcRoot/lib/site';
import * as Sentry from '@sentry/react';
import { useRouteError } from 'react-router-dom';
import { useEffect } from 'react';

function RouteErrorBoundary() {
    const error = useRouteError();
    useEffect(() => {
        if (error) {
            Sentry.captureException(error);
        }
    }, [error]);
    
    cleanUpSessionStorage();
    Site.assignToUrl(INVALID_REQUEST_URL);

    return null;
}

const cleanUpSessionStorage = () => {
    const savedPages = { ...JSON.parse(sessionStorage.getItem(LRF_SAVED_PAGE_SESSION_KEY)) };
    for (let key in savedPages) {
        if (savedPages.hasOwnProperty(key) && savedPages[key]) {
            sessionStorage.removeItem(key);
        }
    }

    sessionStorage.removeItem(LRF_SAVED_PAGE_SESSION_KEY);
};

export default RouteErrorBoundary;
