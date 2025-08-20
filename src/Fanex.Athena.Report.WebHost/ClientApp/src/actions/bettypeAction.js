import { SET_SELECTED_BETTYPE, SET_BETTYPE_LIST, SET_ORIGINAL_BETTYPE_LIST } from './types';

export const setSelectedBettype = betTypeIds => ({
    type: SET_SELECTED_BETTYPE,
    data: betTypeIds,
});

export const setBettypeList = list => ({
    type: SET_BETTYPE_LIST,
    data: list,
});

export const setOrginalBetTypeList = list => ({
    type: SET_ORIGINAL_BETTYPE_LIST,
    data: list,
});
