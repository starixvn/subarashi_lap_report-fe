import createReducer from '@srcRoot/lib/createReducer';
import * as types from '../actions/types';

export const reportBy = createReducer(null, {
    [types.SET_REPORT_BY](state, action) {
        return action.data;
    },
});

export const minimumOdds = createReducer(null, {
    [types.SET_MINIMUM_ODDS](state, action) {
        return action.data;
    },
});

export const selectedTickets = createReducer([], {
    [types.SET_SELECTED_TICKET](state, action) {
        return action.data;
    },
});
