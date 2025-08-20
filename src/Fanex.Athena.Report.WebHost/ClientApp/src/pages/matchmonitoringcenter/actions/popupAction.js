import { SET_IS_SHOW_POPUP, SET_POPUP_URL, SET_POPUP_TITLE, SET_POPUP_STYLE_CLASS_NAME, SET_IS_REFRESH } from './types';

export const setIsShowPopup = isShow => ({
    type: SET_IS_SHOW_POPUP,
    data: isShow,
});

export const setPopupUrl = url => ({
    type: SET_POPUP_URL,
    data: url,
});

export const setPopupTitle = title => ({
    type: SET_POPUP_TITLE,
    data: title,
});

export const setPopupStyleClassName = styleClassName => ({
    type: SET_POPUP_STYLE_CLASS_NAME,
    data: styleClassName,
});

export const setIsRefresh = isRefresh => ({
    type: SET_IS_REFRESH,
    data: isRefresh,
});
