import * as types from './types';

export const setSelectedBettype = (betTypeIds) => {
    return {
        type: types.SET_SELECTED_BETTYPE,
        data: betTypeIds,
    };
};

export const setBettypeList = (list) => {
    return {
        type: types.SET_BETTYPE_LIST,
        data: list,
    };
};

export const setOrginalBetTypeList = (list) => {
    return {
        type: types.SET_ORIGINAL_BETTYPE_LIST,
        data: list,
    };
};
