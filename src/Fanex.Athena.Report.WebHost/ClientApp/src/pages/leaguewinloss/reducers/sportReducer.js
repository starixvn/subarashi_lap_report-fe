import * as types from '../actions/types';
import createReducer from '@/lib/createReducer.js';

const selectedSport = createReducer(
    {},
    {
        [types.SET_SELECTED_SPORT](state, action) {
            return action.data;
        },
    },
);

const sportList = createReducer(
    {},
    {
        [types.SET_SPORT_LIST](state, action) {
            return action.data;
        },
    },
);

export default {
    sportList,
    selectedSport,
};
