import * as types from './types';

export const setDefaultState = item => ({
    type: types.SET_DEFAULT_STATE,
    data: item,
});
