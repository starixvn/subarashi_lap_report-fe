import * as types from './types';

export const setSelectedDate = checked => ({
    type: types.SET_DATE,
    data: checked,
});
