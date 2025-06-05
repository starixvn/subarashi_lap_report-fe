import LangHelper from '@/helpers/langHelper';

export const headerColumns = [
    {
        key: 'time',
        label: LangHelper.getSingleResource('Time'),
        width: 100,
    },
    {
        key: 'detectedInfo',
        label: LangHelper.getSingleResource('DetectedInfo'),
        width: 300,
    },
    {
        key: 'alertRules',
        label: LangHelper.getSingleResource('AlertRules'),
        width: 300,
    },
];
