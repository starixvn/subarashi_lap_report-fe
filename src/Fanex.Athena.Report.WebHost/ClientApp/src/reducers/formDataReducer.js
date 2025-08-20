import { SET_FORM_DATA } from '../actions/types';
import createReducer from '../lib/createReducer.js';

export const formData = createReducer(null, {
    [SET_FORM_DATA](state, action) {
        return action.data;
    },
});
