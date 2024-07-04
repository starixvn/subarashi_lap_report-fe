import LangHelper from '@srcRoot/helpers/langHelper';

export const SettingConst = {
    GroupByProduct: 1,
    ReportBySummary: 1,
    ReportByDaily: 2,
};

export const CurrencySelectAll = { value: 0, label: LangHelper.getSingleResource('All') };

export const ReportBy = [
    { value: 1, label: LangHelper.getSingleResource('Summary') },
    { value: 2, label: LangHelper.getSingleResource('Daily') },
    { value: 3, label: LangHelper.getSingleResource('Monthly') },
];

export const TimeZones = [
    { value: -4, label: 'GMT-4' },
    { value: 7, label: 'GMT+7' },
    { value: 8, label: 'GMT+8' },
];
