import { SET_REPORT_TITLE } from '../actions/types';
import createReducer from '../lib/createReducer';

export const reportTitle = createReducer(null, {
    [SET_REPORT_TITLE](state, action) {
        return action.data;
    },
});
