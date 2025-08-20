import { SET_SELECTED_PRODUCT } from './types';

export const setSelectedProducts = data => ({
    type: SET_SELECTED_PRODUCT,
    data: data,
});
