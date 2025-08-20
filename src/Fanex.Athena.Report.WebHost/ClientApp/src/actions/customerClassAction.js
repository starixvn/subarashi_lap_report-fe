import { SET_SELECTED_CUSTOMERCLASS, SET_SELECTED_RISKLEVEL } from './types';

export const setSelectedCustomerClass = selectedCustomerClass => ({
    type: SET_SELECTED_CUSTOMERCLASS,
    data: selectedCustomerClass,
});

export const setSelectedRiskLevel = selectedRiskLevel => ({
    type: SET_SELECTED_RISKLEVEL,
    data: selectedRiskLevel,
});
