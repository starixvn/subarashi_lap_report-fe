import * as types from '../actions/types';
import createReducer from '@/lib/createReducer.js';

export const selectedBettype = createReducer(
    {},
    {
        [types.SET_SELECTED_BETTYPE](state, action) {
            return action.data;
        },
    }
);

export const bettypeList = createReducer(
    {},
    {
        [types.SET_BETTYPE_LIST](state, action) {
            return action.data;
        },
    }
);

export const originalBetTypeList = createReducer(
    {},
    {
        [types.SET_ORIGINAL_BETTYPE_LIST](state, action) {
            return action.data;
        },
    }
);
