import * as types from './types';

export const setAddNewRule = (value) => {
    return {
        type: types.SET_ADD_NEW_RULE,
        data: value,
    };
};

export const setMonitoringID = (id) => {
    return {
        type: types.SET_MONITORING_ID,
        data: id,
    };
};
