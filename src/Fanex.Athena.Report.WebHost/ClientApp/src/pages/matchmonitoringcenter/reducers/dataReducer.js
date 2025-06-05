import * as types from '../actions/types';
import createReducer from '@/lib/createReducer.js';

export const lastFetchTime = createReducer(null, {
    [types.SET_LAST_FETCH_TIME](state, action) {
        return action.data;
    },
});
