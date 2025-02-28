import * as types from '../actions/types';
import createReducer from '@/lib/createReducer.js';

export const popUpSettings = createReducer(null, {
    [types.SET_POP_UP_SETTINGS](state, action) {
        return action.data;
    },
});
