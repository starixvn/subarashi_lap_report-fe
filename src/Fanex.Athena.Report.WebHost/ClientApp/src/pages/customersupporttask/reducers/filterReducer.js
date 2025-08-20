import createReducer from '@/lib/createReducer.js';
import { SET_SELECTED_SUPPORT_TASK } from '../actions/types';
import { selectedCurrency as currencyReducer_selectedCurrency } from '@/reducers/currencyReducer';

export const selectedSupportTask = createReducer(
    {},
    {
        [SET_SELECTED_SUPPORT_TASK](state, action) {
            return action.data;
        },
    }
);

export const selectedCurrency = currencyReducer_selectedCurrency;
