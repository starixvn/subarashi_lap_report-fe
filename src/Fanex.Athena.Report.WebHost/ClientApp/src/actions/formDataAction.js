import { SET_FORM_DATA } from './types';

export const setFormData = item => ({
    type: SET_FORM_DATA,
    data: item,
});
