import {
    SET_SELECTED_VIPONLY,
    SET_GROUP_IN_ORIGINAL_CURRENCY,
    SET_EXCLUDE_TEST_DATA,
    SET_SELECTED_CASH_OUT_MODE,
    SET_SELECTED_GROUPBYOPTION,
    SET_SELECTED_BREAKBYOPTION,
    SET_SELECTED_ODDSGROUP,
    SET_APP_UUID,
    SET_SEARCH_MODE,
    SET_SELECTED_VIEW_IN_TIME,
    SET_SELECTED_HOUR,
} from './types.js';

export const setSelectedVipOnly = value => ({
    type: SET_SELECTED_VIPONLY,
    data: value,
});

export const setGroupInOriginalCurrency = value => ({
    type: SET_GROUP_IN_ORIGINAL_CURRENCY,
    data: value,
});

export const setExcludeTestData = value => ({
    type: SET_EXCLUDE_TEST_DATA,
    data: value,
});

export const setSelectedCashOutMode = value => ({
    type: SET_SELECTED_CASH_OUT_MODE,
    data: value,
});

export const setSelectedGroupByOption = value => ({
    type: SET_SELECTED_GROUPBYOPTION,
    data: value,
});

export const setSelectedBreakDownByOption = value => ({
    type: SET_SELECTED_BREAKBYOPTION,
    data: value,
});

export const setSelectedOddsGroup = value => ({
    type: SET_SELECTED_ODDSGROUP,
    data: value,
});

export const setAppUuid = value => ({
    type: SET_APP_UUID,
    data: value,
});

export const setSearchMode = value => ({
    type: SET_SEARCH_MODE,
    data: value,
});

export const setSelectedViewInTime = value => ({
    type: SET_SELECTED_VIEW_IN_TIME,
    data: value,
});

export const setHour = value => ({
    type: SET_SELECTED_HOUR,
    data: value,
});
