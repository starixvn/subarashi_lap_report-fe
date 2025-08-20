import { captureException } from '@sentry/react';
import { INVALID_REQUEST_URL, LRF_SAVED_PAGE_SESSION_KEY } from '@/constants/config';
import Site from '@/lib/site';
import { useEffect } from 'react';
import { useRouteError } from 'react-router-dom';

function RouteErrorBoundary() {
    const error = useRouteError();
    useEffect(() => {
        if (error) {
            captureException(error);
        }
    }, [error]);

    cleanUpSessionStorage();
    Site.assignToUrl(INVALID_REQUEST_URL);

    return null;
}

const cleanUpSessionStorage = () => {
    const savedPages = { ...JSON.parse(sessionStorage.getItem(LRF_SAVED_PAGE_SESSION_KEY)) };
    for (const key in savedPages) {
        if (Object.prototype.hasOwnProperty.call(savedPages, key) && savedPages[key]) {
            sessionStorage.removeItem(key);
        }
    }

    sessionStorage.removeItem(LRF_SAVED_PAGE_SESSION_KEY);
};

export default RouteErrorBoundary;
