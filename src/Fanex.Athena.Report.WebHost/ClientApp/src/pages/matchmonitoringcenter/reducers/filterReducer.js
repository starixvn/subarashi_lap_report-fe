import {
    SET_SELECTED_MATCH_STATUS,
    SET_SELECTED_TRIGGERED_ALERT,
    SET_SELECTED_MATCH,
    SET_DEFAULT_STATE,
    SET_SELECTED_LEAGUE,
    SET_MATCH_LIST,
    SET_APP_UUID,
    SET_LEAGUE_LIST,
} from '../actions/types';
import createReducer from '@/lib/createReducer.js';

export const selectedMatchStatus = createReducer(0, {
    [SET_SELECTED_MATCH_STATUS](state, action) {
        return action.data;
    },
});

export const selectedTriggeredAlert = createReducer(0, {
    [SET_SELECTED_TRIGGERED_ALERT](state, action) {
        return action.data;
    },
});

export const selectedMatch = createReducer([], {
    [SET_SELECTED_MATCH](state, action) {
        return action.data;
    },
});

export const defaultState = createReducer(null, {
    [SET_DEFAULT_STATE](state, action) {
        return action.data;
    },
});

export const selectedLeague = createReducer([], {
    [SET_SELECTED_LEAGUE](state, action) {
        return action.data;
    },
});

export const matchList = createReducer([], {
    [SET_MATCH_LIST](state, action) {
        return action.data;
    },
});

export const appUuid = createReducer('', {
    [SET_APP_UUID](state, action) {
        return action.data;
    },
});

export const leagueList = createReducer([], {
    [SET_LEAGUE_LIST](state, action) {
        return action.data;
    },
});
