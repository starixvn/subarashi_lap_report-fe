import { MATCH_WL, LIVE_REPORT } from '@/constants/pages';
import { NOT_FOUND_URL } from '@/constants/config';

import Site from '@/lib/site';
import MatchWinLoss from './MatchWinLoss';
import LiveReport from './LiveReport';

export const getBetListPageWithPageName = pageName => {
    switch (true) {
        case MATCH_WL.toLowerCase() === pageName.toLowerCase():
            return MatchWinLoss;
        case LIVE_REPORT.toLowerCase() === pageName.toLowerCase():
            return LiveReport;
        default:
            Site.redirectToUrl(NOT_FOUND_URL);
            return {};
    }
};
