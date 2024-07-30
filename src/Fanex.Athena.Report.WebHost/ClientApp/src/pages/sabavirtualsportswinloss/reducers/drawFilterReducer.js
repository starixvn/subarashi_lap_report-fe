import * as types from '../actions/types';
import createReducer from '@srcRoot/lib/createReducer.js';

export const selectedDrawFilter = createReducer(null, {
    [types.SET_SELECTED_DRAW_FILTER](state, action) {
        return action.data;
    },
});
