import { SET_SELECTED_BASECURRENCY, SET_BASECURRENCY_LIST } from './types';

export const setSelectedBaseCurrency = baseCurrency => ({
    type: SET_SELECTED_BASECURRENCY,
    data: baseCurrency,
});

export const setBaseCurrencyList = baseCurrencyList => ({
    type: SET_BASECURRENCY_LIST,
    data: baseCurrencyList,
});
