import * as types from './types';

export const setSelectedProductCode = (item) => {
    return {
        type: types.SET_PRODUCT_CODE,
        data: item,
    };
};
