import * as types from './types';

export const setIsShowPopup = (isShow) => {
    return {
        type: types.SET_IS_SHOW_POPUP,
        data: isShow,
    };
};

export const setPopupUrl = (url) => {
    return {
        type: types.SET_POPUP_URL,
        data: url,
    };
};

export const setPopupTitle = (title) => {
    return {
        type: types.SET_POPUP_TITLE,
        data: title,
    };
};

export const setPopupStyleClassName = (styleClassName) => {
    return {
        type: types.SET_POPUP_STYLE_CLASS_NAME,
        data: styleClassName,
    };
};

export const setIsRefresh = (isRefresh) => {
    return {
        type: types.SET_IS_REFRESH,
        data: isRefresh,
    };
};
