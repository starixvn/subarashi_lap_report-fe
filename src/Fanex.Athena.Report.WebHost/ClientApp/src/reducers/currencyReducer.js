import { SET_SELECTED_CURRENCY } from '../actions/types';
import createReducer from '../lib/createReducer.js';

export const selectedCurrency = createReducer(null, {
    [SET_SELECTED_CURRENCY](state, action) {
        return action.data;
    },
});
