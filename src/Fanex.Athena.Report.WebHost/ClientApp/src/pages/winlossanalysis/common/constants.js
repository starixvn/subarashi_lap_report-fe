import LangHelper from '@srcRoot/helpers/langHelper';
import DataService from '@srcRoot/lib/dataService';
import { DefaultDateRange } from './dateSetting';

export const ApiUrl = {
    INIT_FORM_URL: 'Api/WinlossAnalysis/Index',
    GET_DATA_URL: 'api/WinlossAnalysis/GetData',
    EXPORT_EXCEL_URL: 'api/WinlossAnalysis/ExportExcel',
    CUSTOMER_SEARCH_URL: DataService.buildProxyUrl(DataService.apiKeys.report, 'Api/SearchCustomer/SearchCustomer'),
};

export const HeaderText = {
    Index: '#',
    Platform: LangHelper.getSingleResource('Platform'),
    ExternalId: LangHelper.getSingleResource('ExternalId'),
    BetCount: LangHelper.getSingleResource('BetCount'),
    TurnOver: LangHelper.getSingleResource('Turnover'),
    NetTurnOver: LangHelper.getSingleResource('NetTurnOver'),
    PlayerWL: LangHelper.getSingleResource('PlayerWL'),
    EffectiveBettingValue: LangHelper.getSingleResource('EffectiveBettingValue'),
    PlayerComm: LangHelper.getSingleResource('PlayerComm'),
    LicenseeComm: LangHelper.getSingleResource('LicenseeComm'),
    AmountDueToBA: LangHelper.getSingleResource('AmountDueToBA'),
    Margin: LangHelper.getSingleResource('Margin'),
    SystemId: LangHelper.getSingleResource('SystemId'),
    LicenseeWL: LangHelper.getSingleResource('LicenseeW_L'),
    GroupBy: LangHelper.getSingleResource('GroupBy'),
};

export const OneTwoBetLicenseeName = '12Bet';

export const GroupByMode = {
    Date: 1,
    Month: 2,
    Product: 3,
    Sport: 4,
    BetType: 5,
    Currency: 6,
    Platform: 7,
    Player: 8,
    Agent: 9,
    Hour: 10
};

export const BreakdownByMode = {
    Currency: 1,
    Product: 2,
    Player: 3,
};

export const ViewInTimeMode = {
    Financial: 1,
    Settlement: 2
}

export const ALL_SELECTED_TEXT = 'ALL';

export const ProductCode = {
    SportsBook: 'SB',
    BA: 'BA',
    VS: 'VS',
    NG: 'NG',
};

export const VipOnlyList = [
    { value: 0, label: LangHelper.getSingleResource('No') },
    { value: 1, label: LangHelper.getSingleResource('Yes') },
];

export const GroupByList = [
    { value: GroupByMode.Player, label: LangHelper.getSingleResource('Player') },
    { value: GroupByMode.Hour, label: LangHelper.getSingleResource("Hour") },
    { value: GroupByMode.Date, label: LangHelper.getSingleResource('Date') },
    { value: GroupByMode.Month, label: LangHelper.getSingleResource('Month') },
    { value: GroupByMode.Product, label: LangHelper.getSingleResource('Product') },
    { value: GroupByMode.Sport, label: LangHelper.getSingleResource('Sport') },
    { value: GroupByMode.BetType, label: LangHelper.getSingleResource('BetType') },
    { value: GroupByMode.Currency, label: LangHelper.getSingleResource('Currency') },
    { value: GroupByMode.Platform, label: LangHelper.getSingleResource('Platform') },
    { value: GroupByMode.Agent, label: LangHelper.getSingleResource('Agent') },
];

export const DisplayGroupBreakDownMapping = [
    { groupByMode: GroupByMode.Date, breakdownMode: BreakdownByMode.Currency, isDisplayBreakDownInCurrency: true },
    { groupByMode: GroupByMode.Date, breakdownMode: BreakdownByMode.Product, isDisplayBreakDownInCurrency: false },
    { groupByMode: GroupByMode.Month, breakdownMode: BreakdownByMode.Currency, isDisplayBreakDownInCurrency: true },
    { groupByMode: GroupByMode.Month, breakdownMode: BreakdownByMode.Product, isDisplayBreakDownInCurrency: false },
    { groupByMode: GroupByMode.Product, breakdownMode: BreakdownByMode.Currency, isDisplayBreakDownInCurrency: true },
    { groupByMode: GroupByMode.Product, breakdownMode: BreakdownByMode.Product, isDisplayBreakDownInCurrency: true },
    { groupByMode: GroupByMode.Sport, breakdownMode: BreakdownByMode.Currency, isDisplayBreakDownInCurrency: true },
    { groupByMode: GroupByMode.Sport, breakdownMode: BreakdownByMode.Product, isDisplayBreakDownInCurrency: true },
    { groupByMode: GroupByMode.BetType, breakdownMode: BreakdownByMode.Currency, isDisplayBreakDownInCurrency: true },
    { groupByMode: GroupByMode.BetType, breakdownMode: BreakdownByMode.Product, isDisplayBreakDownInCurrency: true },
    { groupByMode: GroupByMode.Currency, breakdownMode: BreakdownByMode.Currency, isDisplayBreakDownInCurrency: true },
    { groupByMode: GroupByMode.Currency, breakdownMode: BreakdownByMode.Product, isDisplayBreakDownInCurrency: true },
    { groupByMode: GroupByMode.Platform, breakdownMode: BreakdownByMode.Currency, isDisplayBreakDownInCurrency: true },
    { groupByMode: GroupByMode.Platform, breakdownMode: BreakdownByMode.Product, isDisplayBreakDownInCurrency: false },
    { groupByMode: GroupByMode.Player, breakdownMode: BreakdownByMode.Currency, isDisplayBreakDownInCurrency: true },
    { groupByMode: GroupByMode.Player, breakdownMode: BreakdownByMode.Product, isDisplayBreakDownInCurrency: true },
    { groupByMode: GroupByMode.Agent, breakdownMode: BreakdownByMode.Currency, isDisplayBreakDownInCurrency: true },
    { groupByMode: GroupByMode.Agent, breakdownMode: BreakdownByMode.Product, isDisplayBreakDownInCurrency: true },
    { groupByMode: GroupByMode.Agent, breakdownMode: BreakdownByMode.Player, isDisplayBreakDownInCurrency: true },
    { groupByMode: GroupByMode.Hour, breakdownMode: BreakdownByMode.Product, isDisplayBreakDownInCurrency: true },
    { groupByMode: GroupByMode.Hour, breakdownMode: BreakdownByMode.Currency, isDisplayBreakDownInCurrency: true },
];

export const DefaultPagingOption = {
    PageIndex: 1,
    PageSize: 100,
    TotalItem: 0,
    PageList: [100, 200, 300, 400, 500, 1000, 2000],
};

export const CashOutMode = {
    IncludeCOFromSB: 0,
    ExcludeCOFromSB: 1,
    ViewCOOnly: 2,
};

export const CashOutModeList = [
    { value: CashOutMode.IncludeCOFromSB, label: LangHelper.getSingleResource('IncludeCOFromSB') },
    { value: CashOutMode.ExcludeCOFromSB, label: LangHelper.getSingleResource('ExcludeCOFromSB') },
    { value: CashOutMode.ViewCOOnly, label: LangHelper.getSingleResource('ViewCOOnly') },
];

export const SortBy = {
    Default: 0,
    BetCount: 1,
    Turnover: 2,
    NetTurnover: 3,
    MemWinloss: 4,
    MemComm: 5,
    LicWinloss: 6,
    LicComm: 7,
    AmtDueToBA: 8,
    BetEffective: 9,
    Margin: 10,
};

export const SortOrder = {
    ASC: 0,
    DESC: 1,
};

export const SearchMode = {
    MatchPrecise: 1,
    MatchCase: 2,
    MatchPrefix: 3,
};

export const ExportExcelMode = {
    All: 1,
    GroupByLevelOnly: 2,
};

export const MobileGroupByHeaderDisplayType = {
    ExternalId: 1,
    SystemId: 2,
};

export const DefaultState = {
    ...DefaultDateRange,
    isGroupInOriginalCurrency: true,
    isExcludeTestData: true,
    selectedGroupByOption: 8,
    selectedBreakDownByOption: 2,
    selectedCashOutMode: CashOutModeList[0],

    requestParam: { PageSize: DefaultPagingOption.PageSize },
    selectedSubsidiary: '',
    subsidiarySearch: false,
    username: '',
    bettypeList: [],
    selectedBettype: 0,
    selectedVipOnly: VipOnlyList[0],
    sportList: [],
    selectedSport: 0,
    reloadReport: false,
    selectedViewInTime: ViewInTimeMode.Financial,
    selectedHour: "All"
};

export const SettlementTimeSupportProductList = [ ProductCode.SportsBook, ProductCode.VS, ProductCode.NG ];

export const MAX_PAGE_EXPORT_PAGE_SIZE = 100000;

export const NUMBER_OF_CUNCURRENT_DOWNLOAD_REQUEST = 2;