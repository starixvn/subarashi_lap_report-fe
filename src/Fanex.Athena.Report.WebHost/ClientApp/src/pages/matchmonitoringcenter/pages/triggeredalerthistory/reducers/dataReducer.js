import { SET_MONITORING_ID } from '../actions/types';
import createReducer from '@/lib/createReducer.js';

export const monitoringId = createReducer(null, {
    [SET_MONITORING_ID](state, action) {
        return action.data;
    },
});
