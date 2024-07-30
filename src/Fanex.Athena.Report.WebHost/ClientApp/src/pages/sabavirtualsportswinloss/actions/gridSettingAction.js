import * as types from './types';

export const setGridSettings = (settings) => {
    return {
        type: types.SET_GRID_SETTINGS,
        data: settings,
    };
};

export const updateGridSettings = (settings) => {
    return {
        type: types.UPDATE_GRID_SETTINGS,
        data: settings,
    };
};
