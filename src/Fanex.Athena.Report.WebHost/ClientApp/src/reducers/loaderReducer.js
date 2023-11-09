import * as types from '../actions/types'
import createReducer from '../lib/createReducer'

export const isLoading = createReducer(false, {
    [types.TOGGLE_LOADER](state, action) {
        return action.data;
    },
});
