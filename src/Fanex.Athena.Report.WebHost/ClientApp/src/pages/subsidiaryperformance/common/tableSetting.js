import { ReportLevel } from '@/constants/report';
import LangHelper from '@/helpers/langHelper';

export const BreadcrumbText = {
    Main: LangHelper.getSingleResource('Main'),
    Customer: LangHelper.getSingleResource('Customer'),
};

export const BreadcrumbItems = [
    {
        label: BreadcrumbText.Main,
        value: ReportLevel.MAIN,
    },
    {
        label: BreadcrumbText.Customer,
        value: ReportLevel.CUSTOMER,
    },
];

export const HeaderText = {
    Index: '#',
    WhiteLabel: LangHelper.getSingleResource('WhiteLabel'),
    Subsidiary: LangHelper.getSingleResource('Subsidiary'),
    CurrencyName: LangHelper.getSingleResource('Currency'),
    Product: LangHelper.getSingleResource('Product'),
    BetCount: LangHelper.getSingleResource('BetCount'),
    Turnover: LangHelper.getSingleResource('Turnover'),
    CustomerWinLoss: LangHelper.getSingleResource('CustomerW_L'),
    SubsidiaryWinLoss: `${LangHelper.getSingleResource('SubsidiaryWL')}`,
    ExternalId: LangHelper.getSingleResource('ExternalId'),
    SystemId: LangHelper.getSingleResource('SystemId'),
};

export const TotalText = {
    Total: LangHelper.getSingleResource('Total'),
    TotalIn: LangHelper.getSingleResource('TotalIn'),
    Based: LangHelper.getSingleResource('Based'),
};
