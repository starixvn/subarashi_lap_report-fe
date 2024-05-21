import * as types from './types';

export function setGridData(data) {
    return {
        type: types.SET_GRID_DATA,
        data: data,
    };
}
