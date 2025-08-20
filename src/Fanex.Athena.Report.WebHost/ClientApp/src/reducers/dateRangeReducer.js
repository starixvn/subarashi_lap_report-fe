import { SET_DATE_RANGE } from '../actions/types';
import createReducer from '../lib/createReducer';
export const dateRange = createReducer(null, {
    [SET_DATE_RANGE](state, action) {
        return action.data;
    },
});
