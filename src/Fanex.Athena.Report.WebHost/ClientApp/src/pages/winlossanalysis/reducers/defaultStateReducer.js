import * as types from '../actions/types.js';
import createReducer from '../../../lib/createReducer.js';

export const defaultState = createReducer(null, {
    [types.SET_DEFAULT_STATE](state, action) {
        return action.data;
    },
});
