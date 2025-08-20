import { SET_MONITORING_ID } from './types';

export const setMonitoringId = monitoringId => ({
    type: SET_MONITORING_ID,
    data: monitoringId,
});
