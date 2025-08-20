import { TOGGLE_LOADER } from '../actions/types';
import createReducer from '../lib/createReducer';

export const isLoading = createReducer(false, {
    [TOGGLE_LOADER](state, action) {
        return action.data;
    },
});
