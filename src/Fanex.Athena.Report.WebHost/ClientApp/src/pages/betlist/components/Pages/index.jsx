import * as pages from '@srcRoot/constants/pages';

import MatchWinLoss from './MatchWinLoss';
import Site from '@srcRoot/lib/site';

export const getBetListPageWithPageName = (pageName) => {
    switch (true) {
        case pages.MATCH_WL.toLowerCase() == pageName.toLowerCase():
            return MatchWinLoss;
        default:
            Site.redirectToUrl(NOT_FOUND_URL);
            return {};
    }
};
