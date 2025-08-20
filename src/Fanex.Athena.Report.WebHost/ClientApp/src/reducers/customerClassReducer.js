import { SET_SELECTED_CUSTOMERCLASS, SET_SELECTED_RISKLEVEL } from '../actions/types';
import createReducer from '../lib/createReducer';

export const selectedCustomerClass = createReducer(null, {
    [SET_SELECTED_CUSTOMERCLASS](state, action) {
        return action.data;
    },
});

export const selectedRiskLevel = createReducer(
    {},
    {
        [SET_SELECTED_RISKLEVEL](state, action) {
            return action.data;
        },
    }
);
