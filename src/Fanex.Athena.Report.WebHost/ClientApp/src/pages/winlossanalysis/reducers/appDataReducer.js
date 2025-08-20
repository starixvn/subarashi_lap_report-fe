import { SET_PRODUCT_LIST } from '../actions/types';
import createReducer from '@/lib/createReducer.js';

export const productList = createReducer([], {
    [SET_PRODUCT_LIST](state, action) {
        return action.data;
    },
});
