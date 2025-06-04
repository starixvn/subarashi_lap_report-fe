import { ACTION_TYPES } from '../actions';
import * as types from '@/actions/types';
import { combineReducers } from 'redux';
import createReducer from '@/lib/createReducer';

export const selectedLogTypes = createReducer('', {
    [ACTION_TYPES.SET_SELECTED_LOG_TYPES](state, action) {
        return action.payload;
    }
});

export const selectedActions = createReducer('', {
    [ACTION_TYPES.SET_SELECTED_ACTIONS](state, action) {
        return action.payload;
    }
});

export const requestParam = createReducer(null, {
    [ACTION_TYPES.SET_REQUEST_PARAM](state, action) {
        return action.payload;
    }
});

export const formData = createReducer(null, {
    [types.SET_FORM_DATA](state, action) {
        return action.data;
    },
    [ACTION_TYPES.SET_ACTION_OPTIONS](state, action) {
        if (!state) {
            return {
                actionOptions: action.payload
            };
        }

        return {
            ...state,
            actionOptions: action.payload
        };
    }
});

export const gridData = createReducer(null, {
    [types.SET_GRID_DATA](state, action) {
        return action.data;
    }
});

export const loading = createReducer(false, {
    [types.TOGGLE_LOADER](state, action) {
        return action.data;
    }
});

export const monitoringID = createReducer(null, {});

const logReducer = combineReducers({
    selectedLogTypes,
    selectedActions,
    requestParam,
    formData,
    gridData,
    loading,
    monitoringID
});

export default logReducer;