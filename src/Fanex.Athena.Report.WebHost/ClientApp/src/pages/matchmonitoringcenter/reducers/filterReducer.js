import * as types from '../actions/types';
import createReducer from '@/lib/createReducer.js';

export const selectedMatchStatus = createReducer(0, {
    [types.SET_SELECTED_MATCH_STATUS](state, action) {
        return action.data;
    },
});

export const selectedTriggeredAlert = createReducer(0, {
    [types.SET_SELECTED_TRIGGERED_ALERT](state, action) {
        return action.data;
    },
});

export const selectedMatch = createReducer([], {
    [types.SET_SELECTED_MATCH](state, action) {
        return action.data;
    },
});

export const defaultState = createReducer(null, {
    [types.SET_DEFAULT_STATE](state, action) {
        return action.data;
    },
});

export const selectedLeague = createReducer([], {
    [types.SET_SELECTED_LEAGUE](state, action) {
        return action.data;
    },
});

export const matchList = createReducer([], {
    [types.SET_MATCH_LIST](state, action) {
        return action.data;
    },
});

export const appUuid = createReducer('', {
    [types.SET_APP_UUID](state, action) {
        return action.data;
    },
});
