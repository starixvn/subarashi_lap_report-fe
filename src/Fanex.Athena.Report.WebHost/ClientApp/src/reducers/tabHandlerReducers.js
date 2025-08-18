import createReducer from '@/lib/createReducer';
import { SET_SELECTED_TAB, SET_TAB_KEYS } from '../actions/types.js';

export const selectedTabKey = createReducer(null, {
    [SET_SELECTED_TAB](prevState, action) {
        return action.data;
    },
});

export const tabKeys = createReducer([], {
    [SET_TAB_KEYS](prevState, action) {
        return action.data;
    },
});
