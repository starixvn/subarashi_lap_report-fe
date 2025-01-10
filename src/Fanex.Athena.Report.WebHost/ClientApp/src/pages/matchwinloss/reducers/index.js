import { combineReducers } from 'redux';

import * as dateRangeReducer from '@srcRoot/reducers/dateRangeReducer';
import * as loaderReducer from '@srcRoot/reducers/loaderReducer';
import * as gridDataReducer from '@srcRoot/reducers/gridDataReducer';
import * as userGuideReducer from '@srcRoot/reducers/userGuideReducer';
import * as requestParamReducer from '@srcRoot/reducers/requestParamReducer';
import * as productReducer from '@srcRoot/reducers/productReducer';
import * as formDataReducer from '@srcRoot/reducers/formDataReducer';
import * as baseCurrencyReducer from '@srcRoot/reducers/baseCurrencyReducer';
import * as currencyReducer from '@srcRoot/reducers/currencyReducer';
import * as dateReducer from '@srcRoot/reducers/dateReducer';

export default combineReducers(
    Object.assign(
        dateReducer,
        dateRangeReducer,
        productReducer,
        loaderReducer,
        gridDataReducer,
        userGuideReducer,
        formDataReducer,
        requestParamReducer,
        baseCurrencyReducer,
        currencyReducer
    )
);
