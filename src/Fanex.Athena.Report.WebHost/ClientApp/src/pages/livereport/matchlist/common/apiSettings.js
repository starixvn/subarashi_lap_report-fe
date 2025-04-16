import * as paths from '@/constants/path';
import * as pages from '@/constants/pages';

export const BetListPageUrl = {
    MATCH: `/${paths.BETLIST}/${pages.LIVE_REPORT}/Match`,
    VSNEWRACING: `/${paths.BETLIST}/${pages.LIVE_REPORT}/VSNewRacing`
};

export const ApiUrl = {
    INIT_FORM_URL: 'Api/LiveReport/MatchList',
    DATA_URL: 'Api/LiveReport/MatchListSort',
    EXPORT_EXCEL_URL: 'Api/LiveReport/MatchListExport',
};
