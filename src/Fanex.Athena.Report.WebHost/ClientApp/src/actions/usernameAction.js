import * as types from './types.js';

export const setUsername = value => ({
    type: types.SET_USERNAME,
    data: value,
});
