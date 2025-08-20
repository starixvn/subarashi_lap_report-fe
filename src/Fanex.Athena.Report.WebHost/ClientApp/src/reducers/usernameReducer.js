import { SET_USERNAME } from '../actions/types';
import createReducer from '../lib/createReducer';

export const username = createReducer('', {
    [SET_USERNAME](state, action) {
        return action.data;
    },
});
