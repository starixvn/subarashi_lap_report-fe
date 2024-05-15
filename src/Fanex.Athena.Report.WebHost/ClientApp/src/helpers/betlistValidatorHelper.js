import * as pages from '@srcRoot/constants/pages';
import * as permissions from '@srcRoot/constants/permission';

import { NOT_FOUND_URL } from '@srcRoot/constants/config';
import Site from '@srcRoot/lib/site';

import { AuthorizeRequestInfo } from './validatorHelper';

const betListLoader = async ({ params }) => {
    const permissions = GetRoutePermission(params.controller);
    if (!permissions) {
        Site.redirectToUrl(NOT_FOUND_URL);
    }

    return await AuthorizeRequestInfo({ permissions: permissions });
};

const GetRoutePermission = (controller) => {
    switch (true) {
        case pages.MATCH_WL.toLowerCase() == controller.toLowerCase():
            return [permissions.MATCH_WL];
        case pages.LIVE_REPORT.toLowerCase() == controller.toLowerCase():
            return [permissions.LIVE_REPORT];
        default:
            return null;
    }
};

export default betListLoader;
