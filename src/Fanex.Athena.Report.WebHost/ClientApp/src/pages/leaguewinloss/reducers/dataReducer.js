import * as types from '../actions/types.js';
import createReducer from '@srcRoot/lib/createReducer.js';

const reportData = createReducer(
    {},
    {
        [types.SET_REPORT_DATA](state, action) {
            return action.data;
        },
    }
);

const reloadReport = createReducer(
    {},
    {
        [types.SET_RELOAD_REPORT](state, action) {
            return action.data;
        },
    }
);

export default {
    reportData,
    reloadReport,
};
