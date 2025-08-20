import { CHANGE_IS_CONVERT_ALL } from '../actions/types';
import createReducer from '../lib/createReducer.js';

export const isConvertAll = createReducer(null, {
    [CHANGE_IS_CONVERT_ALL](state, action) {
        return action.data;
    },
});
