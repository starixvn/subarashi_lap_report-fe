import * as types from './types';

export const setExcludeTestData = (data) => {
    return {
        type: types.SET_EXCLUDE_TEST_DATA,
        data: data,
    };
};

export const setSelectedReportBy = (data) => {
    return {
        type: types.SET_SELECTED_REPORT_BY,
        data: data,
    };
};
