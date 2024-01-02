import createReducer from '@srcRoot/lib/createReducer.js';
import { SET_SELECTED_SUPPORT_TASK } from '../actions/types';
import * as currencyReducer from '@srcRoot/reducers/currencyReducer';

export const selectedSupportTask = createReducer(
    {},
    {
        [SET_SELECTED_SUPPORT_TASK](state, action) {
            return action.data;
        },
    }
);

export const selectedCurrency = currencyReducer.selectedCurrency;
