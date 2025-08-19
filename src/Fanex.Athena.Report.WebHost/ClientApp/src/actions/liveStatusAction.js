import * as types from './types';

export const setSelectedLiveStatus = item => ({
    type: types.SET_SELECTED_LIVESTATUS,
    data: item,
});
