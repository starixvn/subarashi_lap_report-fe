import { SET_MINIMUM_ODDS, SET_REPORT_BY, SET_SELECTED_TICKET } from './types';

export const setMiniumOdds = item => ({
    type: SET_MINIMUM_ODDS,
    data: item,
});

export const setReportBy = item => ({
    type: SET_REPORT_BY,
    data: item,
});

export const setSelectedTicket = item => ({
    type: SET_SELECTED_TICKET,
    data: item,
});
