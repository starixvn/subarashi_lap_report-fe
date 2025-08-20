import { SET_REPORT_FILTER, SET_BREADCRUMB_PARAMS } from '../actions/types';
import createReducer from '@/lib/createReducer.js';

const reportFilter = createReducer(null, {
    [SET_REPORT_FILTER](state, action) {
        return action.data;
    },
});

const breadcrumbParams = createReducer(null, {
    [SET_BREADCRUMB_PARAMS](state, action) {
        return action.data;
    },
});

export default {
    reportFilter,
    breadcrumbParams,
};
