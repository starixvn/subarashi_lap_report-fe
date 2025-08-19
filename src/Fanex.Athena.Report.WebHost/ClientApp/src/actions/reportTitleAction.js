import * as types from './types';

export const setReportTitle = title => ({
    type: types.SET_REPORT_TITLE,
    data: title,
});
