import * as types from './types';

export const setSelectedProducts = (data) => {
    return {
        type: types.SET_SELECTED_PRODUCT,
        data: data,
    };
};
