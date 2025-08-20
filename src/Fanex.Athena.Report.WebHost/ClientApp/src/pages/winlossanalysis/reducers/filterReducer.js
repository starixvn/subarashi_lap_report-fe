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
} from '../actions/types';
import createReducer from '@/lib/createReducer.js';
import { BreakdownByMode, GroupByMode, SearchMode, ViewInTimeMode } from '../common/constants';

export const selectedVipOnly = createReducer(
    {},
    {
        [SET_SELECTED_VIPONLY](state, action) {
            return action.data;
        },
    }
);

export const isGroupInOriginalCurrency = createReducer(true, {
    [SET_GROUP_IN_ORIGINAL_CURRENCY](state, action) {
        return action.data;
    },
});

export const isExcludeTestData = createReducer(true, {
    [SET_EXCLUDE_TEST_DATA](state, action) {
        return action.data;
    },
});

export const selectedCashOutMode = createReducer(false, {
    [SET_SELECTED_CASH_OUT_MODE](state, action) {
        return action.data;
    },
});

export const selectedGroupByOption = createReducer(GroupByMode.Player, {
    [SET_SELECTED_GROUPBYOPTION](state, action) {
        return action.data;
    },
});

export const selectedBreakDownByOption = createReducer(BreakdownByMode.Product, {
    [SET_SELECTED_BREAKBYOPTION](state, action) {
        return action.data;
    },
});

export const selectedOddsGroup = createReducer(
    {},
    {
        [SET_SELECTED_ODDSGROUP](state, action) {
            return action.data;
        },
    }
);

export const appUuid = createReducer('', {
    [SET_APP_UUID](state, action) {
        return action.data;
    },
});

export const searchMode = createReducer(SearchMode.MatchPrecise, {
    [SET_SEARCH_MODE](state, action) {
        return action.data;
    },
});

export const selectedViewInTime = createReducer(ViewInTimeMode.Financial, {
    [SET_SELECTED_VIEW_IN_TIME](state, action) {
        return action.data;
    },
});

export const selectedHour = createReducer('', {
    [SET_SELECTED_HOUR](state, action) {
        return action.data;
    },
});
