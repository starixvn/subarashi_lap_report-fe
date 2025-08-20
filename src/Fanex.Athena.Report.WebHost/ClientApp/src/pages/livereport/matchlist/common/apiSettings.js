import { BETLIST } from '@/constants/path';
import { LIVE_REPORT } from '@/constants/pages';

export const BetListPageUrl = {
    MATCH: `/${BETLIST}/${LIVE_REPORT}/Match`,
    VSNEWRACING: `/${BETLIST}/${LIVE_REPORT}/VSNewRacing`,
};

export const ApiUrl = {
    INIT_FORM_URL: 'Api/LiveReport/MatchList',
    DATA_URL: 'Api/LiveReport/MatchListSort',
    EXPORT_EXCEL_URL: 'Api/LiveReport/MatchListExport',
};
