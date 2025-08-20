import { SET_REQUEST_PARAM } from '../actions/types';
import createReducer from '../lib/createReducer';

export const requestParam = createReducer(
    {},
    {
        [SET_REQUEST_PARAM](state, action) {
            return { ...action.data };
        },
    }
);
