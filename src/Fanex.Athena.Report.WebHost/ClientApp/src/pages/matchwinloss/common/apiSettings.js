import * as paths from '@srcRoot/constants/path';
import * as pages from '@srcRoot/constants/pages';

export const BetListPageUrl = {
    BETTYPE_WINLOSS: `/${paths.BETLIST}/${pages.MATCH_WL}/BetTypeWinLoss`,
    OUTRIGHT: `/${paths.BETLIST}/${pages.MATCH_WL}/Outright`,
    MIXPARLAY: `/${paths.BETLIST}/${pages.MATCH_WL}/MixParlay`,
    MATCH_BETTYPE: `/${paths.BETLIST}/${pages.MATCH_WL}/MatchBetType`,
};

export const ApiUrl = {
    INIT_FORM_URL: 'Api/MatchWinLoss/Index',
    DATA_URL: 'Api/MatchWinLoss/GetData',
    DETAIL_DATA_URL: 'Api/MatchWinLoss/GetDetailData',
    EXPORT_EXCEL_URL: 'Api/MatchWinLoss/ExportExcel',
};
