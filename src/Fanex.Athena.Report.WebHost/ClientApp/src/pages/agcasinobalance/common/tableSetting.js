import LangHelper from '@/helpers/langHelper';

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

export const TableSettings = {
    MinWidth: 1080,
};

export const DefaultPageOption = {
    PageIndex: 1,
    PageSize: 500,
    PageList: [500, 1000, 2000],
};
