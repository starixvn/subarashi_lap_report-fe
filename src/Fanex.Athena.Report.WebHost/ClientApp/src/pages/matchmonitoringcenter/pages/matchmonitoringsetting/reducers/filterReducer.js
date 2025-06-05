import * as types from '../actions/types';
import createReducer from '@/lib/createReducer';

export const addNewRule = createReducer(false, {
    [types.SET_ADD_NEW_RULE](prevState, action) {
        return action.data && action.data;
    },
});

export const monitoringID = createReducer(null, {
    [types.SET_MONITORING_ID](prevState, action) {
        return action.data;
    },
});
