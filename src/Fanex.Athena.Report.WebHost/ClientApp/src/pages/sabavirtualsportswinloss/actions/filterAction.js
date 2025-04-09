import * as types from './types';

export const setSelectedSport = (data) => {
    return {
        type: types.SET_SELECTED_SPORT,
        data: data,
    };
};

export const setSelectedDrawFilter = (data) => {
    return {
        type: types.SET_SELECTED_DRAW_FILTER,
        data: data,
    };
};

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
