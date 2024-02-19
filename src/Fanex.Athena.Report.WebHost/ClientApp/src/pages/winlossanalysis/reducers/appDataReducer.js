import * as types from '../actions/types';
import createReducer from '@srcRoot/lib/createReducer.js';

export const productList = createReducer([], {
    [types.SET_PRODUCT_LIST](state, action) {
        return action.data;
    },
});
