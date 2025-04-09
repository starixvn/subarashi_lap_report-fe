import * as types from '../actions/types';
import createReducer from '@/lib/createReducer.js';

export const selectedSport = createReducer(null, {
    [types.SET_SELECTED_SPORT](state, action) {
        return action.data;
    },
});
