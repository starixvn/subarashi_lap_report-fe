import { SET_SELECTED_LIVESTATUS } from './types';

export const setSelectedLiveStatus = item => ({
    type: SET_SELECTED_LIVESTATUS,
    data: item,
});
