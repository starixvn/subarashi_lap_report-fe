import * as types from '../actions/types';
import createReducer from '@srcRoot/lib/createReducer.js';

export const leagues = createReducer(null, {
    [types.SET_LEAGUE_LIST](state, action) {
        return action.data;
    },
});

export const selectedLeague = createReducer(null, {
    [types.SET_SELECTED_LEAGUE](state, action) {
        return action.data;
    },
});
