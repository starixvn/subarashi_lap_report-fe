import { SET_REPORT_FILTER, SET_DETAIL_PARAMS, SET_CONVERT_ALL_TO_BASE_CURRENCY, SET_DRILL_DOWN_REQUEST } from '../actions/types';
import createReducer from '@/lib/createReducer.js';

const reportFilter = createReducer(null, {
    [SET_REPORT_FILTER](state, action) {
        return action.data;
    },
});

const detailParams = createReducer(null, {
    [SET_DETAIL_PARAMS](state, action) {
        return action.data;
    },
});

const isConvertAllToBaseCurrency = createReducer(true, {
    [SET_CONVERT_ALL_TO_BASE_CURRENCY](state, action) {
        return action.data;
    },
});

const drillDownRequest = createReducer(
    {},
    {
        [SET_DRILL_DOWN_REQUEST](state, action) {
            return action.data;
        },
    }
);

export default {
    reportFilter,
    detailParams,
    isConvertAllToBaseCurrency,
    drillDownRequest,
};
