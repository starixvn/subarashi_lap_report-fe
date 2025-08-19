import * as types from './types';

export const setSelectedCurrency = item => ({
    type: types.SET_SELECTED_CURRENCY,
    data: item,
});
