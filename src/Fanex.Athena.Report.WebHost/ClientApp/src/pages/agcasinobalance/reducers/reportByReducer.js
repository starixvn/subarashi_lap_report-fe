import * as types from '../actions/types';
import createReducer from '@/lib/createReducer.js';

export const selectedReportBy = createReducer(null, {
    [types.SET_SELECTED_REPORT_BY](state, action) {
        return action.data;
    },
});
