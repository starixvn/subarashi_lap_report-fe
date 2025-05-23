import * as types from '../actions/types';
import createReducer from '../lib/createReducer';

export const gridData = createReducer(null, {
    [types.SET_GRID_DATA](state, action) {
        return action.data;
    },
});

export const sweetAlertOption = createReducer(null, {
    [types.SET_SWEET_ALERT_OPTION](state, action) {
        return action.data && { ...action.data };
    },
});
