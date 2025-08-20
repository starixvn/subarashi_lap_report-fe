import { SET_ADD_NEW_RULE, SET_MONITORING_ID } from './types';

export const setAddNewRule = value => ({
    type: SET_ADD_NEW_RULE,
    data: value,
});

export const setMonitoringID = id => ({
    type: SET_MONITORING_ID,
    data: id,
});
