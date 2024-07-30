import * as pages from '@srcRoot/constants/pages';

import { NOT_FOUND_URL } from '@srcRoot/constants/config';
import Site from '@srcRoot/lib/site';
import MatchWinLoss from './MatchWinLoss';
import LiveReport from './LiveReport';
import CustomerPendingFunds from './CustomerPendingFunds';
import SabaVirtualSportsWinLoss from './SabaVirtualSportsWinLoss';

export const getBetListPageWithPageName = (pageName) => {
    switch (true) {
        case pages.MATCH_WL.toLowerCase() == pageName.toLowerCase():
            return MatchWinLoss;
        case pages.LIVE_REPORT.toLowerCase() == pageName.toLowerCase():
            return LiveReport;
        case pages.CUSTOMER_PENDING_FUNDS.toLowerCase() == pageName.toLowerCase():
            return CustomerPendingFunds;
        case pages.SAPA_VIRTUAL_SPORTS_WL.toLowerCase() == pageName.toLowerCase():
            return SabaVirtualSportsWinLoss;
        default:
            Site.redirectToUrl(NOT_FOUND_URL);
            return {};
    }
};
