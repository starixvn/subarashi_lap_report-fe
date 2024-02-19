import * as types from './types';

export const setDefaultState = (item) => {
    return {
        type: types.SET_DEFAULT_STATE,
        data: item,
    };
};
