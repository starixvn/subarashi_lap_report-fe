import { SET_SELECTED_TAB, SET_TAB_KEYS } from './types';

export const setSelectedTab = selectedTabKey => ({
    type: SET_SELECTED_TAB,
    data: selectedTabKey,
});

export const setTabKeys = tabKeys => ({
    type: SET_TAB_KEYS,
    data: tabKeys,
});
