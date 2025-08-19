import * as types from './types';

export const setSelectedProductCode = item => ({
    type: types.SET_PRODUCT_CODE,
    data: item,
});
