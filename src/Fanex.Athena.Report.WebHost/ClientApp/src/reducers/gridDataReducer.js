import { SET_GRID_DATA, SET_SWEET_ALERT_OPTION } from '../actions/types';
import createReducer from '../lib/createReducer';

export const gridData = createReducer(null, {
    [SET_GRID_DATA](state, action) {
        return action.data;
    },
});

export const sweetAlertOption = createReducer(null, {
    [SET_SWEET_ALERT_OPTION](state, action) {
        return action.data && { ...action.data };
    },
});
