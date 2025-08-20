import { SET_SELECTED_SPORT, SET_SPORT_LIST } from '../actions/types';
import createReducer from '@/lib/createReducer.js';

export const selectedSport = createReducer(
    {},
    {
        [SET_SELECTED_SPORT](state, action) {
            return action.data;
        },
    }
);

export const sportList = createReducer(
    {},
    {
        [SET_SPORT_LIST](state, action) {
            return action.data;
        },
    }
);
