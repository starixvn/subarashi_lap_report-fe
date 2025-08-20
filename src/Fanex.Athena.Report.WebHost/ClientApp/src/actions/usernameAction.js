import { SET_USERNAME } from './types.js';

export const setUsername = value => ({
    type: SET_USERNAME,
    data: value,
});
