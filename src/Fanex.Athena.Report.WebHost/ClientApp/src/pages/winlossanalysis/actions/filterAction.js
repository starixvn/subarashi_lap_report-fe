import * as types from './types.js';

export const setSelectedVipOnly = value => ({
    type: types.SET_SELECTED_VIPONLY,
    data: value,
});

export const setGroupInOriginalCurrency = value => ({
    type: types.SET_GROUP_IN_ORIGINAL_CURRENCY,
    data: value,
});

export const setExcludeTestData = value => ({
    type: types.SET_EXCLUDE_TEST_DATA,
    data: value,
});

export const setSelectedCashOutMode = value => ({
    type: types.SET_SELECTED_CASH_OUT_MODE,
    data: value,
});

export const setSelectedGroupByOption = value => ({
    type: types.SET_SELECTED_GROUPBYOPTION,
    data: value,
});

export const setSelectedBreakDownByOption = value => ({
    type: types.SET_SELECTED_BREAKBYOPTION,
    data: value,
});

export const setSelectedOddsGroup = value => ({
    type: types.SET_SELECTED_ODDSGROUP,
    data: value,
});

export const setAppUuid = value => ({
    type: types.SET_APP_UUID,
    data: value,
});

export const setSearchMode = value => ({
    type: types.SET_SEARCH_MODE,
    data: value,
});

export const setSelectedViewInTime = value => ({
    type: types.SET_SELECTED_VIEW_IN_TIME,
    data: value,
});

export const setHour = value => ({
    type: types.SET_SELECTED_HOUR,
    data: value,
});
