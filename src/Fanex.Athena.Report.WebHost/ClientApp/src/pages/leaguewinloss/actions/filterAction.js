import { SET_REPORT_FILTER, SET_BREADCRUMB_PARAMS } from './types.js';

const setReportFilter = data => ({
    type: SET_REPORT_FILTER,
    data: data,
});

const setBreadcrumbParams = data => ({
    type: SET_BREADCRUMB_PARAMS,
    data: data,
});

export default {
    setReportFilter,
    setBreadcrumbParams,
};
