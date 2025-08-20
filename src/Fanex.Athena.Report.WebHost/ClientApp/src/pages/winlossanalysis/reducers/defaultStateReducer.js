import { SET_DEFAULT_STATE } from '../actions/types.js';
import createReducer from '../../../lib/createReducer.js';

export const defaultState = createReducer(null, {
    [SET_DEFAULT_STATE](state, action) {
        return action.data;
    },
});
