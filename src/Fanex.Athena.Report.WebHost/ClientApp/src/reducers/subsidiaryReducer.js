import createReducer from '../lib/createReducer';

import { SET_SUBSIDIARY_LIST, SET_SUBSIDIARY_SEARCH, SET_WHITELABEL_TREE_LIST } from '../actions/types';

export const selectedSubsidiary = createReducer(null, {
    [SET_SUBSIDIARY_LIST](prevState, action) {
        return action.data;
    },
});

export const subsidiarySearch = createReducer(false, {
    [SET_SUBSIDIARY_SEARCH](prevState, action) {
        return action.data;
    },
});

export const whiteLabelTreeList = createReducer(false, {
    [SET_WHITELABEL_TREE_LIST](prevState, action) {
        return action.data;
    },
});
