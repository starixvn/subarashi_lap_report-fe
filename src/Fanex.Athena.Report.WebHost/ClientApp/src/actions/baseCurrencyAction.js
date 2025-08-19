import * as types from './types';

export const setSelectedBaseCurrency = baseCurrency => ({
    type: types.SET_SELECTED_BASECURRENCY,
    data: baseCurrency,
});

export const setBaseCurrencyList = baseCurrencyList => ({
    type: types.SET_BASECURRENCY_LIST,
    data: baseCurrencyList,
});
