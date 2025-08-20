import { SET_SELECTED_BETTYPE, SET_BETTYPE_LIST } from '../actions/types';
import createReducer from '@/lib/createReducer.js';

const selectedBettype = createReducer(
    {},
    {
        [SET_SELECTED_BETTYPE](state, action) {
            return action.data;
        },
    }
);

const bettypeList = createReducer(
    {},
    {
        [SET_BETTYPE_LIST](state, action) {
            return action.data;
        },
    }
);

export default {
    selectedBettype,
    bettypeList,
};
