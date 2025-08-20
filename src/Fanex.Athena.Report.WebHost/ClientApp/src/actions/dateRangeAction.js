import { SET_DATE_RANGE } from './types';

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
