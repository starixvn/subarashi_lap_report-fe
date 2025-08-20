import { SET_SELECTED_LIVESTATUS } from '../actions/types';
import createReducer from '../lib/createReducer';

export const selectedLiveStatus = createReducer(null, {
    [SET_SELECTED_LIVESTATUS](state, action) {
        return action.data;
    },
});
