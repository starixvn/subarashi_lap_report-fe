import * as types from './types.js';

const setReportFilter = (data) => {
    return {
        type: types.SET_REPORT_FILTER,
        data: data,
    };
};

export default {
    setReportFilter,
};
