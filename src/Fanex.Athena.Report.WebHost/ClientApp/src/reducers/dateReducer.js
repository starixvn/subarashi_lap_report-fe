import * as types from '../actions/types';
import createReducer from '../lib/createReducer.js';

export const selectedDate = createReducer(null, {
    [types.SET_DATE](state, action) {
        return action.data;
    },
});
