import * as pages from '@/constants/pages';

import Site from '@/lib/site';
import MatchWinLoss from './MatchWinLoss';
import LiveReport from './LiveReport';
import CustomerPendingFunds from './CustomerPendingFunds';

export const getBetListPageWithPageName = (pageName) => {
    switch (pageName.toLowerCase()) {
        case pages.MATCH_WL.toLowerCase():
            return MatchWinLoss;
        case pages.LIVE_REPORT.toLowerCase():
            return LiveReport;
        case pages.CUSTOMER_PENDING_FUNDS.toLowerCase():
            return CustomerPendingFunds;
        default:
            Site.redirectToUrl(NOT_FOUND_URL);
            return {};
    }
};
