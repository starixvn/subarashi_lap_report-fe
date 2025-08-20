import { SET_TIMEZONE, SET_REPORTBY, SET_DATE_RANGE, CHANGE_GROUPBY, CHANGE_IS_CONVERT_ALL, CHANGE_IS_INCLUDE_DRAW_DATA } from './types.js';

export const setSelectedTimeZone = value => ({
    type: SET_TIMEZONE,
    data: value,
});

export const setSelectedReportBy = value => ({
    type: SET_REPORTBY,
    data: value,
});

export const setDateRange = dateRange => {
    const range = {
        fromDate: dateRange.startDate,
        toDate: dateRange.endDate,
    };

    return {
        type: SET_DATE_RANGE,
        data: range,
    };
};

export const changeGroupBy = value => ({
    type: CHANGE_GROUPBY,
    data: value,
});

export const changeIsConvertAll = checked => ({
    type: CHANGE_IS_CONVERT_ALL,
    data: checked,
});

export const changeIsIncludeDrawData = checked => ({
    type: CHANGE_IS_INCLUDE_DRAW_DATA,
    data: checked,
});
