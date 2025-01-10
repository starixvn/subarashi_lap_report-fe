import * as paths from '@srcRoot/constants/path';
import * as pages from '@srcRoot/constants/pages';

export const BetListPageUrl = {
    101: `/${paths.BETLIST}/${pages.LIVE_REPORT}/MixParlay?BetType=9&`,
    102: `/${paths.BETLIST}/${pages.LIVE_REPORT}/MixParlay?BetType=29&`,
    103: `/${paths.BETLIST}/${pages.LIVE_REPORT}/Outright?`,
    161: `/${paths.BETLIST}/${pages.LIVE_REPORT}/NumberGame?SportType=161&`,
    164: `/${paths.BETLIST}/${pages.LIVE_REPORT}/NumberGame?SportType=164&`,
    168: `/${paths.BETLIST}/${pages.LIVE_REPORT}/NumberGame?SportType=168&`,
    181: `/${paths.BETLIST}/${pages.LIVE_REPORT}/VirtualSports?SportType=181&`,
    182: `/${paths.BETLIST}/${pages.LIVE_REPORT}/VirtualSports?SportType=182&`,
    183: `/${paths.BETLIST}/${pages.LIVE_REPORT}/VirtualSports?SportType=183&`,
    184: `/${paths.BETLIST}/${pages.LIVE_REPORT}/VirtualSports?SportType=184&`,
    185: `/${paths.BETLIST}/${pages.LIVE_REPORT}/VirtualSports?SportType=185&`,
    104: `/${paths.BETLIST}/${pages.LIVE_REPORT}/MixParlay?BetType=9&`,
    175: `/${paths.BETLIST}/${pages.LIVE_REPORT}/BitCoin?SportType=175&`,
    169: `/${paths.BETLIST}/${pages.LIVE_REPORT}/SportsLottery?SportType=169&`,
    231: `/${paths.BETLIST}/${pages.LIVE_REPORT}/VS3?SportType=231&`,
};

export const MatchListPage = 'MatchList';

export const ApiUrl = {
    INIT_FORM_URL: `Api/LiveReport/Index`,
    DATA_URL: `Api/LiveReport/Summary`,
    DETAIL_DATA_URL: `Api/LiveReport/Detail`,
    EXPORT_EXCEL_URL: `Api/LiveReport/ExportExcel`,
};
