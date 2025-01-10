import * as types from './types';

export const setMiniumOdds = (item) => {
    return {
        type: types.SET_MINIMUM_ODDS,
        data: item,
    };
};

export const setReportBy = (item) => {
    return {
        type: types.SET_REPORT_BY,
        data: item,
    };
};

export const setSelectedTicket = (item) => {
    return {
        type: types.SET_SELECTED_TICKET,
        data: item,
    };
};
