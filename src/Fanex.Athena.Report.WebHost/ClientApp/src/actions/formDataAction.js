import * as types from './types';

export const setFormData = item => ({
    type: types.SET_FORM_DATA,
    data: item,
});
