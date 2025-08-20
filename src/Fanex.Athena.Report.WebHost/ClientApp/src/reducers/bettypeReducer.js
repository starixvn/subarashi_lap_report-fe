import { SET_SELECTED_BETTYPE, SET_BETTYPE_LIST } from '../actions/types';
import createReducer from '../lib/createReducer.js';

export const selectedBettype = createReducer(null, {
    [SET_SELECTED_BETTYPE](state, action) {
        return action.data;
    },
});

export const bettypeList = createReducer([], {
    [SET_BETTYPE_LIST](state, action) {
        return action.data;
    },
});
