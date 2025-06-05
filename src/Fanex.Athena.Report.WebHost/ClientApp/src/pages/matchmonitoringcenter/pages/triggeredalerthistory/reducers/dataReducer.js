import * as types from '../actions/types';
import createReducer from '@/lib/createReducer.js';

export const monitoringId = createReducer(null, {
    [types.SET_MONITORING_ID](state, action) {
        return action.data;
    },
});
