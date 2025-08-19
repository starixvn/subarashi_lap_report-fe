import React from 'react';
import LangHelper from '@/helpers/langHelper';

export const tabKeys = {
    alertRule: 'AlertRules',
    log: 'Logs',
};

const dynamicImports = {
    [tabKeys.log]: () => import(/* webpackChunkName: "matchmonitoringcenter/monitordetail/log" */ '../tabs/Log'),
    [tabKeys.alertRule]: () => import(/* webpackChunkName: "matchmonitoringcenter/monitordetail/alertrule" */ '../tabs/AlertRule'),
};

export const tabMenuList = Object.values(tabKeys).map(key => ({
    key,
    title: LangHelper.getSingleResource(key),
    component: React.lazy(dynamicImports[key]),
    preLoad: dynamicImports[key],
}));

export const preLoadComponents = lazyComponents => {
    lazyComponents && setTimeout(() => lazyComponents.forEach(_ => _.preLoad && _.preLoad()), 0);
};

export const TabType = {
    alertRule: 1,
    log: 2,
};

export const InputType = {
    number: 'number',
    text: 'text',
};

export const conditions = [
    {
        key: 'and',
        value: 'and',
        displayValue: LangHelper.getSingleResource('and'),
    },
    {
        key: 'or',
        value: 'or',
        displayValue: LangHelper.getSingleResource('or'),
    },
];

export const notifyEverys = [
    {
        key: -1,
        value: -1,
        displayValue: LangHelper.getSingleResource('OnlyOnce'),
    },
    {
        key: 180,
        value: 180,
        displayValue: `180 ${LangHelper.getSingleResource('seconds')}`,
    },
    {
        key: 300,
        value: 300,
        displayValue: `300 ${LangHelper.getSingleResource('seconds')}`,
    },
    {
        key: 600,
        value: 600,
        displayValue: `600 ${LangHelper.getSingleResource('seconds')}`,
    },
];

export const defaultNotifyEvery = 300;
export const defaultCondition = 'and';

export const ApiUrl = {
    SETTING_INDEX_URL: 'Api/MatchMonitoringCenter/SettingIndex',
    ALERT_RULE_DATA_URL: 'Api/MatchMonitoringCenter/GetAlertRule',
    CREATE_ALERT_RULE_URL: 'Api/MatchMonitoringCenter/InsertAlertRule',
    UPDATE_ALERT_RULE_URL: 'Api/MatchMonitoringCenter/UpdateAlertRule',
    DELETE_ALERT_RULE_URL: 'Api/MatchMonitoringCenter/DeleteAlertRule',
};
