import * as types from '../actions/types';
import createReducer from '../lib/createReducer.js';

export const selectedProduct = createReducer(null, {
    [types.SET_SELECTED_PRODUCT](state, action) {
        return action.data;
    },
});
