import * as pages from '@/constants/pages';

import Site from '@/lib/site';
import MatchWinLoss from './MatchWinLoss';
import LiveReport from './LiveReport';

export const getBetListPageWithPageName = (pageName) => {
    switch (true) {
        case pages.MATCH_WL.toLowerCase() == pageName.toLowerCase():
            return MatchWinLoss;
        case pages.LIVE_REPORT.toLowerCase() == pageName.toLowerCase():
            return LiveReport;
        default:
            Site.redirectToUrl(NOT_FOUND_URL);
            return {};
    }
};
