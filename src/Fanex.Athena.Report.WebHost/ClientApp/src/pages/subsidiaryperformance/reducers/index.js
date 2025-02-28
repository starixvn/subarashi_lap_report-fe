import { combineReducers } from 'redux';

import * as loaderReducer from '@/reducers/loaderReducer';
import * as gridDataReducer from '@/reducers/gridDataReducer';
import * as dateRangeReducer from '@/reducers/dateRangeReducer';
import * as userGuideReducer from '@/reducers/userGuideReducer';
import * as requestParamReducer from '@/reducers/requestParamReducer';
import * as productReducer from '@/reducers/productReducer';
import * as formDataReducer from '@/reducers/formDataReducer';
import * as currencyReducer from '@/reducers/currencyReducer';
import * as baseCurrencyReducer from '@/reducers/baseCurrencyReducer';
import * as filterReducer from './filterReducer';

export default combineReducers(
    Object.assign(
        productReducer,
        loaderReducer,
        gridDataReducer,
        userGuideReducer,
        formDataReducer,
        requestParamReducer,
        currencyReducer,
        baseCurrencyReducer,
        dateRangeReducer,
        filterReducer,
    ),
);
