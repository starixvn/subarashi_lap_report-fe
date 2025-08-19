import * as types from './types';

export const setSelectedSubsidiary = subsidiaryKeys => ({
    type: types.SET_SUBSIDIARY,
    data: subsidiaryKeys,
});

export const setSelectedWhiteLabel = whiteLabelKeys => ({
    type: types.SET_WHITELABEL,
    data: whiteLabelKeys,
});

export const setDateRange = dateRange => {
    const range = {
        fromDate: dateRange.startDate,
        toDate: dateRange.endDate,
    };

    return {
        type: types.SET_DATE_RANGE,
        data: range,
    };
};

export const changeConvertAll = checked => ({
    type: types.CHANGE_CONVERT_ALL,
    data: checked,
});

export const changeIncludeDrawData = checked => ({
    type: types.CHANGE_INCLUDE_DRAW_DATA,
    data: checked,
});

export const changeExcludeTest = checked => ({
    type: types.CHANGE_EXCLUDE_TEST,
    data: checked,
});

export const changeSeparateSabaWinLoss = checked => ({
    type: types.CHANGE_SEPRATE_SABA_WINLOSS,
    data: checked,
});
