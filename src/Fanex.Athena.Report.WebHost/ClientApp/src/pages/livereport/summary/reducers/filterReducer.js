import { SET_PRODUCT_CODE } from '../actions/types';
import createReducer from '@/lib/createReducer';

export const selectedProductCode = createReducer(false, {
    [SET_PRODUCT_CODE](state, action) {
        return action.data;
    },
});
