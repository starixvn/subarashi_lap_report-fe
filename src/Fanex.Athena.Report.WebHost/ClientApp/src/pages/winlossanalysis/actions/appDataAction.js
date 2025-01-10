import * as types from './types.js';

export const setProductList = (data) => {
    return {
        type: types.SET_PRODUCT_LIST,
        data: data,
    };
};
