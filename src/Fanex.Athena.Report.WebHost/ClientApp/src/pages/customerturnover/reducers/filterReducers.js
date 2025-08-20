import createReducer from '@/lib/createReducer';
import { SET_REPORT_BY, SET_MINIMUM_ODDS, SET_SELECTED_TICKET } from '../actions/types';

export const reportBy = createReducer(null, {
    [SET_REPORT_BY](state, action) {
        return action.data;
    },
});

export const minimumOdds = createReducer(null, {
    [SET_MINIMUM_ODDS](state, action) {
        return action.data;
    },
});

export const selectedTickets = createReducer([], {
    [SET_SELECTED_TICKET](state, action) {
        return action.data;
    },
});
