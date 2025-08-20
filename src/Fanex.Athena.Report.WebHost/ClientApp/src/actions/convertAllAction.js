import { CHANGE_IS_CONVERT_ALL } from './types';

export const changeIsConvertAll = checked => ({
    type: CHANGE_IS_CONVERT_ALL,
    data: checked,
});
