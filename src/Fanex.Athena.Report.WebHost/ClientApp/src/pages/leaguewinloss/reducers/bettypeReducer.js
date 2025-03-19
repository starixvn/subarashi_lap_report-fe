import * as types from '../actions/types';
import createReducer from '@/lib/createReducer.js';

const selectedBettype = createReducer(
    {},
    {
        [types.SET_SELECTED_BETTYPE](state, action) {
            return action.data;
        },
    }
);

const bettypeList = createReducer(
    {},
    {
        [types.SET_BETTYPE_LIST](state, action) {
            return action.data;
        },
    }
);

export default {
    selectedBettype,
    bettypeList,
};
