import LangHelper from '@srcRoot/helpers/langHelper';

export const DrillDownLevel = {
    Main: 0,
    Licensee: 1,
    Customer: 2,
};

export const BreadcrumbText = {
    Main: LangHelper.getSingleResource('Main'),
    Licensee: LangHelper.getSingleResource('Licensee'),
    Customer: LangHelper.getSingleResource('Customer'),
};

export const BreadcrumbItems = [
    {
        label: BreadcrumbText.Main,
        value: DrillDownLevel.Main,
    },
    {
        label: BreadcrumbText.Licensee,
        value: DrillDownLevel.Licensee,
    },
    {
        label: BreadcrumbText.Customer,
        value: DrillDownLevel.Customer,
    },
];

export const GridDataCacheKeyPrefix = 'SabaVirtualSportsWinLossGridCache';

export const TableSettings = {
    MinWidth: 1480,
};

export const DefaultPageOption = {
    PageIndex: 1,
    PageSize: 50,
    TotalItem: 1,
    PageList: [50, 100, 200, 300, 400, 500, 1000, 2000],
};

export const SortKeys = {
    ExternalId: 'ExternalID',
    SystemId: 'SystemId',
    BetCount: 'CurrencyName',
    TotalTurnOverSingle: 'TotalTurnOverSingle',
    TotalTransaction: 'TotalTransaction',
    CustomerWinLoss: 'CustomerWinLoss',
    CustomerComm: 'CustomerComm',
    CustomerTotal: 'CustomerTotal',
    TotalLicenseeWLSingle: 'TotalLicenseeWLSingle',
    CashOutCommission: 'CashOutCommission',
    BACommission: 'BACommission',
    AmtDueToBA: 'AmtDueToBA',
    CurrencyId: 'CurrencyId',
    productName: 'productName',
};
