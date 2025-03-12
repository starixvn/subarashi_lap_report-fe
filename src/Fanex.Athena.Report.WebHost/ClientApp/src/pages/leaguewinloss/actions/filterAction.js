import * as types from './types.js';

const setReportFilter = (data) => {
    return {
        type: types.SET_REPORT_FILTER,
        data: data,
    };
};

const setBreadcrumbParams = (data) => {
    return {
        type: types.SET_BREADCRUMB_PARAMS,
        data: data,
    };
};

export default {
    setReportFilter,
    setBreadcrumbParams
};
