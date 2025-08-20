import createReducer from '@/lib/createReducer.js';
import { SET_GRID_DATA } from '../actions/types.js';

export const gridData = createReducer(
    {},
    {
        [SET_GRID_DATA](state, action) {
            return action.data;
        },
    }
);
