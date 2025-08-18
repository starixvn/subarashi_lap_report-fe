import LangHelper from '@/helpers/langHelper';
import DataService from '@/lib/dataService';
export const DefaultPageSize = 50;

export const ApiUrl = {
    INIT_FORM_URL: 'Api/LeagueWinLoss/Index',
    CUSTOMER_SEARCH_URL: DataService.buildProxyUrl(DataService.apiKeys.report, 'Api/SearchCustomer/SearchCustomer'),
    REPORT_DATA_URL: 'Api/LeagueWinLoss/GetMainData',
    EXPORT_REPORT_DATA_URL: 'Api/LeagueWinLoss/ExportExcel',
    REPORT_CURRENCY_DATA_URL: 'Api/LeagueWinLoss/GetCurrencyData',
};

export const headerText = {
    league: LangHelper.getSingleResource('League'),
    playercount: LangHelper.getSingleResource('PlayerCount'),
    betcount: LangHelper.getSingleResource('BetCount'),
    turnover: LangHelper.getSingleResource('Turnover'),
    customerWL: LangHelper.getSingleResource('CustomerW_L'),
    licenseeWL: LangHelper.getSingleResource('LicenseeW_L'),
    BACommission: LangHelper.getSingleResource('BACommission'),
    match: LangHelper.getSingleResource('Match'),
    bettype: LangHelper.getSingleResource('BetType'),
};

export const BreadcrumbText = {
    main: LangHelper.getSingleResource('League'),
    match: LangHelper.getSingleResource('Match'),
    bettype: LangHelper.getSingleResource('BetType'),
};

export const ReportLevel = {
    MAIN: 0,
    MATCH: 1,
    BETTYPE: 2,
};

export const BreadcrumbItems = [
    {
        label: BreadcrumbText.main,
        value: ReportLevel.MAIN,
    },
    {
        label: BreadcrumbText.match,
        value: ReportLevel.MATCH,
    },
    {
        label: BreadcrumbText.bettype,
        value: ReportLevel.BETTYPE,
    },
];

export const ALL_SELECTED_TEXT = 'ALL';
