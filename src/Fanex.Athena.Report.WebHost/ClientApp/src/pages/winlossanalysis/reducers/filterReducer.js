import * as types from '../actions/types';
import createReducer from '@srcRoot/lib/createReducer.js';
import { BreakdownByMode, GroupByMode, SearchMode } from '../common/constants';

export const selectedVipOnly = createReducer(
    {},
    {
        [types.SET_SELECTED_VIPONLY](state, action) {
            return action.data;
        },
    }
);

export const isGroupInOriginalCurrency = createReducer(true, {
    [types.SET_GROUP_IN_ORIGINAL_CURRENCY](state, action) {
        return action.data;
    },
});

export const isExcludeTestData = createReducer(true, {
    [types.SET_EXCLUDE_TEST_DATA](state, action) {
        return action.data;
    },
});

export const selectedCashOutMode = createReducer(false, {
    [types.SET_SELECTED_CASH_OUT_MODE](state, action) {
        return action.data;
    },
});

export const selectedGroupByOption = createReducer(GroupByMode.Player, {
    [types.SET_SELECTED_GROUPBYOPTION](state, action) {
        return action.data;
    },
});

export const selectedBreakDownByOption = createReducer(BreakdownByMode.Product, {
    [types.SET_SELECTED_BREAKBYOPTION](state, action) {
        return action.data;
    },
});

export const selectedOddsGroup = createReducer(
    {},
    {
        [types.SET_SELECTED_ODDSGROUP](state, action) {
            return action.data;
        },
    }
);

export const appUuid = createReducer('', {
    [types.SET_APP_UUID](state, action) {
        return action.data;
    },
});

export const searchMode = createReducer(SearchMode.MatchPrecise, {
    [types.SET_SEARCH_MODE](state, action) {
        return action.data;
    },
});
