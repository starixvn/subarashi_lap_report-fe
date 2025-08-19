import * as types from './types';

export const setMonitoringId = monitoringId => ({
    type: types.SET_MONITORING_ID,
    data: monitoringId,
});
