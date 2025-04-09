import * as types from '../actions/types';
import createReducer from '@/lib/createReducer.js';

export const isExcludeTestData = createReducer(true, {
    [types.SET_EXCLUDE_TEST_DATA](state, action) {
        return action.data;
    },
});
