import * as types from '../actions/types';
import createReducer from '@srcRoot/lib/createReducer.js';

const reportFilter = createReducer(null, {
    [types.SET_REPORT_FILTER](state, action) {
        return action.data;
    },
});

export default {
    reportFilter,
};
