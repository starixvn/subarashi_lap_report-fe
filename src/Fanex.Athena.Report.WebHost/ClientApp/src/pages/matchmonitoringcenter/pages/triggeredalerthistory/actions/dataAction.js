import * as types from './types';

export const setMonitoringId = (monitoringId) => {
    return {
        type: types.SET_MONITORING_ID,
        data: monitoringId,
    };
};
