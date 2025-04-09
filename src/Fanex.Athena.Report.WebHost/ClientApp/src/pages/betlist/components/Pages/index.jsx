import * as pages from '@/constants/pages';

import Site from '@/lib/site';
import { NOT_FOUND_URL } from '@/constants/config';
import MatchWinLoss from './MatchWinLoss';
import LiveReport from './LiveReport';
import CustomerPendingFunds from './CustomerPendingFunds';
import SabaVirtualSportsWinLoss from './SabaVirtualSportsWinLoss';

export const getBetListPageWithPageName = (pageName) => {
    switch (pageName.toLowerCase()) {
        case pages.MATCH_WL.toLowerCase():
            return MatchWinLoss;
        case pages.LIVE_REPORT.toLowerCase():
            return LiveReport;
        case pages.CUSTOMER_PENDING_FUNDS.toLowerCase():
            return CustomerPendingFunds;
        case pages.SAPA_VIRTUAL_SPORTS_WL.toLowerCase():
            return SabaVirtualSportsWinLoss;
        default:
            Site.redirectToUrl(NOT_FOUND_URL);
            return {};
    }
};
