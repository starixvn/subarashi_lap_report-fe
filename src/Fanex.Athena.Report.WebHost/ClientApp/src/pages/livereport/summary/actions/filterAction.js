import { SET_PRODUCT_CODE } from './types';

export const setSelectedProductCode = item => ({
    type: SET_PRODUCT_CODE,
    data: item,
});
