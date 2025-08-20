import { SET_DEFAULT_STATE } from './types';

export const setDefaultState = item => ({
    type: SET_DEFAULT_STATE,
    data: item,
});
