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
