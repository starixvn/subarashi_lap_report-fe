import * as paths from '@/constants/path';
import * as pages from '@/constants/pages';

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

export const SpecialProducts = ['NG'];

export const VsSportTypes = [181, 182, 183, 185, 198, 177];

export const SupportDrillDownProducts = ['SB', 'VS', 'NG'];

export const MaxLength = 36;
