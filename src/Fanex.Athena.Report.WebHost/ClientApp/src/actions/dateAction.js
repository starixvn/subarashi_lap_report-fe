import * as types from './types';

export const setSelectedDate = (checked) => {
    return {
        type: types.SET_DATE,
        data: checked,
    };
};
