import * as types from '../actions/types';
import createReducer from '@srcRoot/lib/createReducer.js';

export const gridSettings = createReducer(null, {
    [types.SET_GRID_SETTINGS](state, action) {
        return action.data;
    },
});
