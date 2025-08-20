import { USER_GUIDE_CONTENT } from '../actions/types';
import createReducer from '../lib/createReducer';

export const userGuideContent = createReducer(null, {
    [USER_GUIDE_CONTENT](state, action) {
        return action.data;
    },
});
