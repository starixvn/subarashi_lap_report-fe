import * as types from './types';

export const setRequestParam = data => ({
    type: types.SET_REQUEST_PARAM,
    data: data,
});
