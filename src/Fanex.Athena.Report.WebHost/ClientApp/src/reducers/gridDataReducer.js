import * as types from '../actions/types'
import createReducer from '../lib/createReducer'

export const gridData = createReducer({}, {
    [types.SET_GRID_DATA](state, action) {
        return action.data;
    }
});