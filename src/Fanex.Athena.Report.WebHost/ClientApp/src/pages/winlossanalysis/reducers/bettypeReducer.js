import { SET_SELECTED_BETTYPE, SET_BETTYPE_LIST, SET_ORIGINAL_BETTYPE_LIST } from '../actions/types';
import createReducer from '@/lib/createReducer.js';

export const selectedBettype = createReducer(
    {},
    {
        [SET_SELECTED_BETTYPE](state, action) {
            return action.data;
        },
    }
);

export const bettypeList = createReducer(
    {},
    {
        [SET_BETTYPE_LIST](state, action) {
            return action.data;
        },
    }
);

export const originalBetTypeList = createReducer(
    {},
    {
        [SET_ORIGINAL_BETTYPE_LIST](state, action) {
            return action.data;
        },
    }
);
