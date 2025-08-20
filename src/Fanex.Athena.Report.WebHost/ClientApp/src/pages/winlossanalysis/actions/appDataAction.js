import { SET_PRODUCT_LIST } from './types.js';

export const setProductList = data => ({
    type: SET_PRODUCT_LIST,
    data: data,
});
