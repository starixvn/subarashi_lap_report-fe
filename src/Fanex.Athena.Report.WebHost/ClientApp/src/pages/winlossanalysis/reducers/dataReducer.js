import { SET_REPORT_DATA, SET_RELOAD_REPORT } from '../actions/types.js';
import createReducer from '@/lib/createReducer.js';

export const reportData = createReducer(
    {},
    {
        [SET_REPORT_DATA](state, action) {
            return action.data;
        },
    }
);

export const reloadReport = createReducer(
    {},
    {
        [SET_RELOAD_REPORT](state, action) {
            return action.data;
        },
    }
);
