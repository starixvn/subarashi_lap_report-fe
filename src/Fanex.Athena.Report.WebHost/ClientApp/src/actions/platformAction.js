import { SET_SELECTED_PLATFORM } from './types';

export const setSelectedPlatform = item => ({
    type: SET_SELECTED_PLATFORM,
    data: item,
});
