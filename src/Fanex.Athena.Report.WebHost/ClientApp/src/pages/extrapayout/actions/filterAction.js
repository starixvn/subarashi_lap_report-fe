import { SET_REPORT_FILTER, SET_DETAIL_PARAMS, SET_CONVERT_ALL_TO_BASE_CURRENCY } from './types';

const setReportFilter = data => ({
    type: SET_REPORT_FILTER,
    data: data,
});

const setDetailParams = data => ({
    type: SET_DETAIL_PARAMS,
    data: data,
});

const setConvertAllToBaseCurrency = data => ({
    type: SET_CONVERT_ALL_TO_BASE_CURRENCY,
    data: data,
});

const setDrillDownRequest = (data) => {
    return {
        type: types.SET_DRILL_DOWN_REQUEST,
        data: data,
    };
};

export default {
    setReportFilter,
    setDetailParams,
    setConvertAllToBaseCurrency,
    setDrillDownRequest,
};
