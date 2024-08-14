import * as types from '../actions/types';
import createReducer from '@srcRoot/lib/createReducer.js';

export const drillDownCache = createReducer(null, {
    [types.SET_DRILL_DOWN_CACHE](state, action) {
        return { ...state, ...action.data };
    },
});
