import * as types from './types';

const setReportFilter = data => ({
    type: types.SET_REPORT_FILTER,
    data: data,
});

const setDetailParams = data => ({
    type: types.SET_DETAIL_PARAMS,
    data: data,
});

const setConvertAllToBaseCurrency = data => ({
    type: types.SET_CONVERT_ALL_TO_BASE_CURRENCY,
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
