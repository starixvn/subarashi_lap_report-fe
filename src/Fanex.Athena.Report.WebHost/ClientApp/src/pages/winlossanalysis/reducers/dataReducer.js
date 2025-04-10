import * as types from '../actions/types.js';
import createReducer from '@/lib/createReducer.js';

export const reportData = createReducer(
    {},
    {
        [types.SET_REPORT_DATA](state, action) {
            return action.data;
        },
    }
);

export const reloadReport = createReducer(
    {},
    {
        [types.SET_RELOAD_REPORT](state, action) {
            return action.data;
        },
    }
);
