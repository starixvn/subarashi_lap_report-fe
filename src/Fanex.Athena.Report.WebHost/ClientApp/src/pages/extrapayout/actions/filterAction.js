import * as types from './types';

const setReportFilter = (data) => {
    return {
        type: types.SET_REPORT_FILTER,
        data: data,
    };
};

const setDetailParams = (data) => {
    return {
        type: types.SET_DETAIL_PARAMS,
        data: data,
    };
};

const setConvertAllToBaseCurrency = (data) => {
    return {
        type: types.SET_CONVERT_ALL_TO_BASE_CURRENCY,
        data: data,
    };
};

export default {
    setReportFilter,
    setDetailParams,
    setConvertAllToBaseCurrency,
};
