import * as types from '../actions/types';
import createReducer from '../lib/createReducer';

export const selectedLiveStatus = createReducer(null, {
    [types.SET_SELECTED_LIVESTATUS](state, action) {
        return action.data;
    },
});
