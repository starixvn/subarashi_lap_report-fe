import * as types from '../actions/types';
import createReducer from '../lib/createReducer.js';

export const formData = createReducer(null, {
    [types.SET_FORM_DATA](state, action) {
        return action.data;
    },
});
