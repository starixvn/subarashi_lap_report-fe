import { SET_DATE } from '../actions/types';
import createReducer from '../lib/createReducer.js';

export const selectedDate = createReducer(null, {
    [SET_DATE](state, action) {
        return action.data;
    },
});
