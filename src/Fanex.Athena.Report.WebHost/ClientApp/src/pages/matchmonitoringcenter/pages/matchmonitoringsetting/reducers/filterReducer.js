import { SET_ADD_NEW_RULE, SET_MONITORING_ID } from '../actions/types';
import createReducer from '@/lib/createReducer';

export const addNewRule = createReducer(false, {
    [SET_ADD_NEW_RULE](prevState, action) {
        return action.data && action.data;
    },
});

export const monitoringID = createReducer(null, {
    [SET_MONITORING_ID](prevState, action) {
        return action.data;
    },
});
