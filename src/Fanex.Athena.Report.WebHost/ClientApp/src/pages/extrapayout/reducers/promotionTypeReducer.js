import * as types from '../actions/types';
import createReducer from '@srcRoot/lib/createReducer.js';

const selectedPromotionTypes = createReducer(
    {},
    {
        [types.SET_SELECTED_PROMOTION_TYPES](state, action) {
            return action.data;
        },
    }
);

const promotionTypeList = createReducer(
    {},
    {
        [types.SET_PROMOTION_TYPE_LIST](state, action) {
            return action.data;
        },
    }
);

export default {
    promotionTypeList,
    selectedPromotionTypes,
};
