import * as types from '../actions/types';
import createReducer from '../lib/createReducer';

export const selectedBaseCurrency = createReducer(null, {
    [types.SET_SELECTED_BASECURRENCY](state, action) {
        return action.data;
    },
});

export const baseCurrencyList = createReducer(
    {},
    {
        [types.SET_BASECURRENCY_LIST](state, action) {
            return action.data;
        },
    },
);
