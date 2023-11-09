import createReducer from '@srcRoot/lib/createReducer.js';
import * as types from '../actions/types'

export const matches = createReducer([], {
    [types.SET_MATCHES](state, action) {
        return action.data;
    }
})