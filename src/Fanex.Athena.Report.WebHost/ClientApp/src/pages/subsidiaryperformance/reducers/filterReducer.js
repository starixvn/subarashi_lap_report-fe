import createReducer from '../../../lib/createReducer.js';
import * as types from '../actions/types.js';

export const selectedSubsidiary = createReducer(null, {
    [types.SET_SUBSIDIARY](state, action) {
        return action.data;
    },
});

export const selectedWhiteLabel = createReducer(null, {
    [types.SET_WHITELABEL](state, action) {
        return action.data;
    },
});

export const convertAll = createReducer(null, {
    [types.CHANGE_CONVERT_ALL](state, action) {
        return action.data;
    },
});

export const includeDrawData = createReducer(null, {
    [types.CHANGE_INCLUDE_DRAW_DATA](state, action) {
        return action.data;
    },
});

export const separateSabaWinLoss = createReducer(null, {
    [types.CHANGE_SEPRATE_SABA_WINLOSS](state, action) {
        return action.data;
    },
});

export const excludeTest = createReducer(null, {
    [types.CHANGE_EXCLUDE_TEST](state, action) {
        return action.data;
    },
});
