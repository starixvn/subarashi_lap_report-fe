import { SET_REQUEST_PARAM } from './types';

export const setRequestParam = data => ({
    type: SET_REQUEST_PARAM,
    data: data,
});
