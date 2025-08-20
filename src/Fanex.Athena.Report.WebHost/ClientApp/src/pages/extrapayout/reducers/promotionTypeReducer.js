import { SET_SELECTED_PROMOTION_TYPES, SET_PROMOTION_TYPE_LIST } from '../actions/types';
import createReducer from '@/lib/createReducer.js';

const selectedPromotionTypes = createReducer(
    {},
    {
        [SET_SELECTED_PROMOTION_TYPES](state, action) {
            return action.data;
        },
    }
);

const promotionTypeList = createReducer(null, {
    [SET_PROMOTION_TYPE_LIST](state, action) {
        return action.data;
    },
});

export default {
    promotionTypeList,
    selectedPromotionTypes,
};
