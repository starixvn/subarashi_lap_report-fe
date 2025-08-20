import { SET_SELECTED_BASECURRENCY, SET_BASECURRENCY_LIST } from '../actions/types';
import createReducer from '../lib/createReducer';

export const selectedBaseCurrency = createReducer(null, {
    [SET_SELECTED_BASECURRENCY](state, action) {
        return action.data;
    },
});

export const baseCurrencyList = createReducer(
    {},
    {
        [SET_BASECURRENCY_LIST](state, action) {
            return action.data;
        },
    }
);
