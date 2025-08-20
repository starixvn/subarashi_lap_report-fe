import {
    SET_SUBSIDIARY,
    SET_WHITELABEL,
    SET_DATE_RANGE,
    CHANGE_CONVERT_ALL,
    CHANGE_INCLUDE_DRAW_DATA,
    CHANGE_EXCLUDE_TEST,
    CHANGE_SEPRATE_SABA_WINLOSS,
} from './types';

export const setSelectedSubsidiary = subsidiaryKeys => ({
    type: SET_SUBSIDIARY,
    data: subsidiaryKeys,
});

export const setSelectedWhiteLabel = whiteLabelKeys => ({
    type: SET_WHITELABEL,
    data: whiteLabelKeys,
});

export const setDateRange = dateRange => {
    const range = {
        fromDate: dateRange.startDate,
        toDate: dateRange.endDate,
    };

    return {
        type: SET_DATE_RANGE,
        data: range,
    };
};

export const changeConvertAll = checked => ({
    type: CHANGE_CONVERT_ALL,
    data: checked,
});

export const changeIncludeDrawData = checked => ({
    type: CHANGE_INCLUDE_DRAW_DATA,
    data: checked,
});

export const changeExcludeTest = checked => ({
    type: CHANGE_EXCLUDE_TEST,
    data: checked,
});

export const changeSeparateSabaWinLoss = checked => ({
    type: CHANGE_SEPRATE_SABA_WINLOSS,
    data: checked,
});
