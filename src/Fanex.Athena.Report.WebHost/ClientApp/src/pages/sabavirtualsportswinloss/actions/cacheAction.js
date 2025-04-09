import * as types from './types';

export const setDrillDownCache = (data) => {
    return {
        type: types.SET_DRILL_DOWN_CACHE,
        data: data,
    };
};
