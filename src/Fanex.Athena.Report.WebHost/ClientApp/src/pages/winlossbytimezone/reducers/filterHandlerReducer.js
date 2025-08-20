import createReducer from '@/lib/createReducer.js';
import {
    GET_TIMEZONE,
    SET_TIMEZONE,
    GET_REPORTBY,
    SET_REPORTBY,
    SET_DATE_RANGE,
    CHANGE_GROUPBY,
    CHANGE_IS_CONVERT_ALL,
    CHANGE_IS_INCLUDE_DRAW_DATA,
    GET_DATE_CONSTRAINT,
} from '../actions/types.js';

export const timeZoneList = createReducer(
    {},
    {
        [GET_TIMEZONE](state, action) {
            return action.data;
        },
    }
);

export const selectedTimeZone = createReducer(
    {},
    {
        [SET_TIMEZONE](state, action) {
            return action.data;
        },
    }
);

export const reportByList = createReducer(
    {},
    {
        [GET_REPORTBY](state, action) {
            return action.data;
        },
    }
);

export const selectedReportBy = createReducer(
    {},
    {
        [SET_REPORTBY](state, action) {
            return action.data;
        },
    }
);

export const dateRange = createReducer(
    {},
    {
        [SET_DATE_RANGE](state, action) {
            return action.data;
        },
    }
);

export const groupBy = createReducer(
    {},
    {
        [CHANGE_GROUPBY](state, action) {
            return action.data;
        },
    }
);

export const isConvertAll = createReducer(
    {},
    {
        [CHANGE_IS_CONVERT_ALL](state, action) {
            return action.data;
        },
    }
);

export const isIncludeDrawData = createReducer(
    {},
    {
        [CHANGE_IS_INCLUDE_DRAW_DATA](state, action) {
            return action.data;
        },
    }
);

export const dateConstraint = createReducer(
    {},
    {
        [GET_DATE_CONSTRAINT](state, action) {
            return action.data;
        },
    }
);
