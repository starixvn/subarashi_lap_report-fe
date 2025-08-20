import { CHANGE_IS_EXCLUDE_TEST } from './types';

export const changeIsExcludeTest = checked => ({
    type: CHANGE_IS_EXCLUDE_TEST,
    data: checked,
});
