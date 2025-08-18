import * as types from '../actions/types';
import createReducer from '@/lib/createReducer.js';

const reportFilter = createReducer(null, {
    [types.SET_REPORT_FILTER](state, action) {
        return action.data;
    },
});

const breadcrumbParams = createReducer(null, {
    [types.SET_BREADCRUMB_PARAMS](state, action) {
        return action.data;
    },
});

export default {
    reportFilter,
    breadcrumbParams,
};
