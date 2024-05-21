import * as types from '../actions/types';
import createReducer from '../lib/createReducer';
export const dateRange = createReducer(null, {
    [types.SET_DATE_RANGE](state, action) {
        return action.data;
    },
});
