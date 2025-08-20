import { BETLIST } from '@/constants/path';
import { LIVE_REPORT } from '@/constants/pages';

export const BetListPageUrl = {
    101: `/${BETLIST}/${LIVE_REPORT}/MixParlay?BetType=9&`,
    102: `/${BETLIST}/${LIVE_REPORT}/MixParlay?BetType=29&`,
    103: `/${BETLIST}/${LIVE_REPORT}/Outright?`,
    161: `/${BETLIST}/${LIVE_REPORT}/NumberGame?SportType=161&`,
    164: `/${BETLIST}/${LIVE_REPORT}/NumberGame?SportType=164&`,
    168: `/${BETLIST}/${LIVE_REPORT}/NumberGame?SportType=168&`,
    181: `/${BETLIST}/${LIVE_REPORT}/VirtualSports?SportType=181&`,
    182: `/${BETLIST}/${LIVE_REPORT}/VirtualSports?SportType=182&`,
    183: `/${BETLIST}/${LIVE_REPORT}/VirtualSports?SportType=183&`,
    184: `/${BETLIST}/${LIVE_REPORT}/VirtualSports?SportType=184&`,
    185: `/${BETLIST}/${LIVE_REPORT}/VirtualSports?SportType=185&`,
    104: `/${BETLIST}/${LIVE_REPORT}/MixParlay?BetType=9&`,
    175: `/${BETLIST}/${LIVE_REPORT}/BitCoin?SportType=175&`,
    169: `/${BETLIST}/${LIVE_REPORT}/SportsLottery?SportType=169&`,
    231: `/${BETLIST}/${LIVE_REPORT}/VS3?SportType=231&`,
};

export const MatchListPage = 'MatchList';

export const ApiUrl = {
    INIT_FORM_URL: `Api/LiveReport/Index`,
    DATA_URL: `Api/LiveReport/Summary`,
    DETAIL_DATA_URL: `Api/LiveReport/Detail`,
    EXPORT_EXCEL_URL: `Api/LiveReport/ExportExcel`,
};
