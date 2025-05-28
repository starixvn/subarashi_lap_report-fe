import * as types from './types';

export function setGridData(data) {
    return {
        type: types.SET_GRID_DATA,
        data: data,
    };
}

export const setSweetAlertOption = (data) => {
    return {
        type: types.SET_SWEET_ALERT_OPTION,
        data,
    };
};
