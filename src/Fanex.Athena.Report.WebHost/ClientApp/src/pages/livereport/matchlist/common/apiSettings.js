import * as paths from '@srcRoot/constants/path';
import * as pages from '@srcRoot/constants/pages';

export const BetListPageUrl = {
    MATCH: `/${paths.BETLIST}/${pages.LIVE_REPORT}/Match`,
};

export const ApiUrl = {
    INIT_FORM_URL: 'Api/LiveReport/MatchList',
    DATA_URL: 'Api/LiveReport/MatchListSort',
    EXPORT_EXCEL_URL: 'Api/LiveReport/MatchListExport',
};
