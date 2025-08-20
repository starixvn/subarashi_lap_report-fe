import { SET_REPORT_TITLE } from './types';

export const setReportTitle = title => ({
    type: SET_REPORT_TITLE,
    data: title,
});
