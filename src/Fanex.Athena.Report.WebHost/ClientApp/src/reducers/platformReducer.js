import { SET_SELECTED_PLATFORM } from '../actions/types';
import createReducer from '../lib/createReducer.js';

export const selectedPlatform = createReducer(null, {
    [SET_SELECTED_PLATFORM](state, action) {
        return action.data;
    },
});
