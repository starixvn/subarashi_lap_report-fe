import * as types from './types';

export const setGridSettings = (settings) => {
    return {
        type: types.SET_GRID_SETTINGS,
        data: settings,
    };
};

export const setPopUpSettings = (settings) => {
    return {
        type: types.SET_POP_UP_SETTINGS,
        data: settings,
    };
};
