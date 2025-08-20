import { SET_GRID_DATA, SET_SWEET_ALERT_OPTION } from './types';

export function setGridData(data) {
    return {
        type: SET_GRID_DATA,
        data: data,
    };
}

export const setSweetAlertOption = data => ({
    type: SET_SWEET_ALERT_OPTION,
    data,
});
