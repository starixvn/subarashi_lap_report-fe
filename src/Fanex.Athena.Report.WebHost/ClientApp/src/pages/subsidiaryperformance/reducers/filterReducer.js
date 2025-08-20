import createReducer from '../../../lib/createReducer.js';
import {
    SET_SUBSIDIARY,
    SET_WHITELABEL,
    CHANGE_CONVERT_ALL,
    CHANGE_INCLUDE_DRAW_DATA,
    CHANGE_SEPRATE_SABA_WINLOSS,
    CHANGE_EXCLUDE_TEST,
} from '../actions/types.js';

export const selectedSubsidiary = createReducer(null, {
    [SET_SUBSIDIARY](state, action) {
        return action.data;
    },
});

export const selectedWhiteLabel = createReducer(null, {
    [SET_WHITELABEL](state, action) {
        return action.data;
    },
});

export const convertAll = createReducer(null, {
    [CHANGE_CONVERT_ALL](state, action) {
        return action.data;
    },
});

export const includeDrawData = createReducer(null, {
    [CHANGE_INCLUDE_DRAW_DATA](state, action) {
        return action.data;
    },
});

export const separateSabaWinLoss = createReducer(null, {
    [CHANGE_SEPRATE_SABA_WINLOSS](state, action) {
        return action.data;
    },
});

export const excludeTest = createReducer(null, {
    [CHANGE_EXCLUDE_TEST](state, action) {
        return action.data;
    },
});
