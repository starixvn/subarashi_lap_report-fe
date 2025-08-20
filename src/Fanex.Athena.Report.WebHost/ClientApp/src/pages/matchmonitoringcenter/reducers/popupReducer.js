import { SET_IS_SHOW_POPUP, SET_POPUP_URL, SET_POPUP_TITLE, SET_POPUP_STYLE_CLASS_NAME, SET_IS_REFRESH } from '../actions/types';
import createReducer from '@/lib/createReducer.js';

export const isShowPopup = createReducer(false, {
    [SET_IS_SHOW_POPUP](state, action) {
        return action.data;
    },
});

export const popupUrl = createReducer('', {
    [SET_POPUP_URL](state, action) {
        return action.data;
    },
});

export const popupTitle = createReducer('', {
    [SET_POPUP_TITLE](state, action) {
        return action.data;
    },
});

export const popupStyleClassName = createReducer('', {
    [SET_POPUP_STYLE_CLASS_NAME](state, action) {
        return action.data;
    },
});

export const isRefresh = createReducer(false, {
    [SET_IS_REFRESH](state, action) {
        return action.data;
    },
});
