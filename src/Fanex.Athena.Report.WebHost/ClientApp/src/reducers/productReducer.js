import { SET_SELECTED_PRODUCT } from '../actions/types';
import createReducer from '../lib/createReducer.js';

export const selectedProduct = createReducer(null, {
    [SET_SELECTED_PRODUCT](state, action) {
        return action.data;
    },
});
