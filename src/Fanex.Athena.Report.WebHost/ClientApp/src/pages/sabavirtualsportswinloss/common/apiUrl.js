import * as paths from '@/constants/path';
import * as pages from '@/constants/pages';
import DataService from '@/lib/dataService';

export const ApiUrl = {
    INIT_FORM_URL: 'Api/SabaVirtualSportsWinLoss/Index',
    LEAGUE_DATA_URL: 'Api/SabaVirtualSportsWinLoss/LeaguesBySport',
    DATA_URL: 'Api/SabaVirtualSportsWinLoss/Data',
    CUSTOMER_SEARCH_URL: DataService.buildProxyUrl(DataService.apiKeys.report, 'Api/SearchCustomer/SearchCustomer'),
    EXPORT_EXCEL_URL: 'Api/SabaVirtualSportsWinLoss/ExportExcel',
};

export const BetListPageUrl = {
    DATA_URL: `${paths.BETLIST}/${pages.SAPA_VIRTUAL_SPORTS_WL}/Index`,
};
