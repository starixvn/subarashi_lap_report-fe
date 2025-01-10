import * as types from '../actions/types';
import createReducer from '@srcRoot/lib/createReducer';

export const selectedProductCode = createReducer(false, {
    [types.SET_PRODUCT_CODE](state, action) {
        return action.data;
    },
});
