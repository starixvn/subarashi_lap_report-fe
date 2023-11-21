import * as types from '../actions/types'
import createReducer from '../lib/createReducer'

export const userGuideParams = createReducer({}, {
    [types.USER_GUIDE_PARAMS](state, action) {
        return action.data;
}});
