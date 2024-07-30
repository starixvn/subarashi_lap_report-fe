import * as types from './types';

export const setPopUpSettings = (settings) => {
    return {
        type: types.SET_POP_UP_SETTINGS,
        data: settings,
    };
};
