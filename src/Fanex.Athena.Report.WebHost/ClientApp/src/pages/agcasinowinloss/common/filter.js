import LangHelper from '@/helpers/langHelper';

export const SelectAllOption = { value: 0, label: LangHelper.getSingleResource('All') };

export const DrawFilterOptions = [
    { value: 1, label: LangHelper.getSingleResource('Normal') },
    { value: 2, label: LangHelper.getSingleResource('NoDraws') },
    { value: 3, label: LangHelper.getSingleResource('NoDrawsForTurnoverOnly') },
];

export const ReportByOptions = [
    { value: 1, label: LangHelper.getSingleResource('Daily') },
    { value: 2, label: LangHelper.getSingleResource('Monthly') },
];

export const ExcludeTestDataOptions = [
    { value: 'true', label: LangHelper.getSingleResource('Yes') },
    { value: 'false', label: LangHelper.getSingleResource('No') },
];

export const ReportByValue = {
    Daily: 1,
    Monthly: 2,
};

export const PopUpNotificationSetting = {
    Title: 'LRF-NOTIFICATION',
};
