import * as types from '../actions/types';
import createReducer from '../lib/createReducer.js';

export const selectedPlatform = createReducer(null, {
    [types.SET_SELECTED_PLATFORM](state, action) {
        return action.data;
    },
});
