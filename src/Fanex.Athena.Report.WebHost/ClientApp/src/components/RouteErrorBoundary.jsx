import React from 'react';
import { INVALID_REQUEST_URL } from '@srcRoot/constants/config';
import Site from '@srcRoot/lib/site';

function RouteErrorBoundary() {
    Site.assignToUrl(INVALID_REQUEST_URL);

    return null;
}

export default RouteErrorBoundary;
