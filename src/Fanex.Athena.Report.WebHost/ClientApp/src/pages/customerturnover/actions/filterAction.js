import * as types from './types';

export const setMiniumOdds = item => ({
    type: types.SET_MINIMUM_ODDS,
    data: item,
});

export const setReportBy = item => ({
    type: types.SET_REPORT_BY,
    data: item,
});

export const setSelectedTicket = item => ({
    type: types.SET_SELECTED_TICKET,
    data: item,
});
