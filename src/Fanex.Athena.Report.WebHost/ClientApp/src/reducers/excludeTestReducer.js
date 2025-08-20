import { CHANGE_IS_EXCLUDE_TEST } from '../actions/types';
import createReducer from '../lib/createReducer.js';

export const isExcludeTest = createReducer(
    {},
    {
        [CHANGE_IS_EXCLUDE_TEST](state, action) {
            return action.data;
        },
    }
);
