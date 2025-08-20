import { SET_SELECTED_CURRENCY } from './types';

export const setSelectedCurrency = item => ({
    type: SET_SELECTED_CURRENCY,
    data: item,
});
