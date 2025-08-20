import { SET_SELECTED_STATUS } from './types';

export const setSelectedStatus = item => ({
    type: SET_SELECTED_STATUS,
    data: item,
});
