import * as types from './types';

export const setSelectedCustomerClass = (selectedCustomerClass) => {
    return {
        type: types.SET_SELECTED_CUSTOMERCLASS,
        data: selectedCustomerClass,
    };
};

export const setSelectedRiskLevel = (selectedRiskLevel) => {
    return {
        type: types.SET_SELECTED_RISKLEVEL,
        data: selectedRiskLevel,
    };
};
