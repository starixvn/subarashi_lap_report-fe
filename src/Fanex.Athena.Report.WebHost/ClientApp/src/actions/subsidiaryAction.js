import { SET_SUBSIDIARY_LIST, SET_SUBSIDIARY_SEARCH, SET_WHITELABEL_TREE_LIST } from './types';

export const setSubsidiaryList = subsidiaryList => ({
    type: SET_SUBSIDIARY_LIST,
    data: subsidiaryList,
});

export const setSubsidiarySearch = subsidiarySearch => ({
    type: SET_SUBSIDIARY_SEARCH,
    data: subsidiarySearch,
});

export const setWhiteLabelTreeList = whiteLabelTreeList => ({
    type: SET_WHITELABEL_TREE_LIST,
    data: whiteLabelTreeList,
});
