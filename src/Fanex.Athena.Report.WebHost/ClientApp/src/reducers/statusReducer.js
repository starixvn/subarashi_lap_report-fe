import { SET_SELECTED_STATUS } from '../actions/types';
import createReducer from '../lib/createReducer';

export const selectedStatus = createReducer(null, {
    [SET_SELECTED_STATUS](state, action) {
        return action.data;
    },
});
