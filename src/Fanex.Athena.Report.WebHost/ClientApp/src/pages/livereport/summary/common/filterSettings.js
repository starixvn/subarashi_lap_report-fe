import LangHelper from '@srcRoot/helpers/langHelper';

export const CurrencySelectAll = { value: 0, label: 'ALL' };

export const LiveStatuses = [
    { value: 2, label: LangHelper.getSingleResource('All') },
    { value: 1, label: LangHelper.getSingleResource('Live') },
    { value: 0, label: LangHelper.getSingleResource('NoneLive') },
];

export const DefaultLiveStatus = LiveStatuses[1];
