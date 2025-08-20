import { SET_DATE } from './types';

export const setSelectedDate = checked => ({
    type: SET_DATE,
    data: checked,
});
