import * as types from './types';

export const setAddNewRule = value => ({
    type: types.SET_ADD_NEW_RULE,
    data: value,
});

export const setMonitoringID = id => ({
    type: types.SET_MONITORING_ID,
    data: id,
});
