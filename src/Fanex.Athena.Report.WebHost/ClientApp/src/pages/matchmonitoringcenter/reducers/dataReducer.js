import { SET_LAST_FETCH_TIME } from '../actions/types';
import createReducer from '@/lib/createReducer.js';

export const lastFetchTime = createReducer(null, {
    [SET_LAST_FETCH_TIME](state, action) {
        return action.data;
    },
});
