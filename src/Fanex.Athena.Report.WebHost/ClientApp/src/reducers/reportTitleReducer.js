import * as types from '../actions/types';
import createReducer from '../lib/createReducer';

export const reportTitle = createReducer(null, {
    [types.SET_REPORT_TITLE](state, action) {
        return action.data;
    },
});
