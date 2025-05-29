import * as types from '../actions/types';
import createReducer from '@/lib/createReducer.js';

export const isShowPopup = createReducer(false, {
    [types.SET_IS_SHOW_POPUP](state, action) {
        return action.data;
    },
});

export const popupUrl = createReducer('', {
    [types.SET_POPUP_URL](state, action) {
        return action.data;
    },
});

export const popupTitle = createReducer('', {
    [types.SET_POPUP_TITLE](state, action) {
        return action.data;
    },
});

export const popupStyleClassName = createReducer('', {
    [types.SET_POPUP_STYLE_CLASS_NAME](state, action) {
        return action.data;
    },
});

export const isRefresh = createReducer(false, {
    [types.SET_IS_REFRESH](state, action) {
        return action.data;
    },
});
