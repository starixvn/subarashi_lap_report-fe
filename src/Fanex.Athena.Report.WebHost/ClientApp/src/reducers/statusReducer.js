import * as types from '../actions/types';
import createReducer from '../lib/createReducer';

export const selectedStatus = createReducer(null, {
    [types.SET_SELECTED_STATUS](state, action) {
        return action.data;
    },
});
