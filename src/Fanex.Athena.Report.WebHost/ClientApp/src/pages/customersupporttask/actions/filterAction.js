import * as currencyAction from '@/actions/currencyAction';
import { SET_SELECTED_SUPPORT_TASK } from './types';

export const setSelectedSupportTask = option => ({
    type: SET_SELECTED_SUPPORT_TASK,
    data: option,
});

export const setSelectedCurrency = currencyAction.setSelectedCurrency;
