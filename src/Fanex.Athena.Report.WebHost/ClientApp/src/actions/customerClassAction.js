import * as types from './types';

export const setSelectedCustomerClass = selectedCustomerClass => ({
    type: types.SET_SELECTED_CUSTOMERCLASS,
    data: selectedCustomerClass,
});

export const setSelectedRiskLevel = selectedRiskLevel => ({
    type: types.SET_SELECTED_RISKLEVEL,
    data: selectedRiskLevel,
});
