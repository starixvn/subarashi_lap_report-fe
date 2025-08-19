import LangHelper from '@/helpers/langHelper';

export const headerColumns = [
    {
        key: 'kickOffTime',
        label: LangHelper.getSingleResource('KickOffTime'),
        width: 100,
    },
    {
        key: 'matchStatus',
        label: LangHelper.getSingleResource('MatchStatus'),
        width: 100,
    },
    {
        key: 'triggeredAlert',
        label: LangHelper.getSingleResource('TriggeredAlert'),
        width: 100,
    },
    {
        key: 'alertRules',
        label: LangHelper.getSingleResource('AlertRules'),
        width: 200,
    },
    {
        key: 'event',
        label: LangHelper.getSingleResource('Event'),
        width: 200,
    },
    {
        key: 'stake',
        label: `${LangHelper.getSingleResource('Stake')} (%)`,
        width: 100,
    },
    {
        key: 'totalHome',
        label: LangHelper.getSingleResource('TotalHome'),
        width: 100,
    },
    {
        key: 'totalAway',
        label: LangHelper.getSingleResource('TotalAway'),
        width: 100,
    },
    {
        key: 'forecastHome',
        label: LangHelper.getSingleResource('ForecastHome'),
        width: 100,
    },
    {
        key: 'forecastAway',
        label: LangHelper.getSingleResource('ForecastAway'),
        width: 100,
    },
];
