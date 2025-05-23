import LangHelper from '@/helpers/langHelper';

export const CurrencySelectAll = { value: 0, label: LangHelper.getSingleResource('All') };

export const RefreshCountdown = {
    DefaultValue: 60,
    Options: [60, 75, 90, 105, 120],
};

export const TriggerAlert = [
    { value: -1, label: LangHelper.getSingleResource('All') },
    { value: 0, label: LangHelper.getSingleResource('Safe') },
    { value: 1, label: LangHelper.getSingleResource('Dangerous') },
];

export const MatchStatus = [
    { value: -1, label: LangHelper.getSingleResource('All') },
    { value: 0, label: LangHelper.getSingleResource('Non-Live') },
    { value: 1, label: LangHelper.getSingleResource('Live') },
];
