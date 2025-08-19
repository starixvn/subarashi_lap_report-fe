import * as types from './types';

export const changeIsConvertAll = checked => ({
    type: types.CHANGE_IS_CONVERT_ALL,
    data: checked,
});
