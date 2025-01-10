import { combineReducers } from 'redux';
import filterReducer from './filterReducer';
import dataReducer from './dataReducer';
import promotionTypeReducer from './promotionTypeReducer';
import * as productReducer from '@srcRoot/reducers/productReducer';
import * as currencyReducer from '@srcRoot/reducers/currencyReducer';
import * as baseCurrencyReducer from '@srcRoot/reducers/baseCurrencyReducer';
import * as loaderReducer from '@srcRoot/reducers/loaderReducer';
import * as userGuideReducer from '@srcRoot/reducers/userGuideReducer';
import * as dateRangeReducer from '@srcRoot/reducers/dateRangeReducer';
import * as requestParamReducer from '@srcRoot/reducers/requestParamReducer';
import * as reportTitleReducer from '@srcRoot/reducers/reportTitleReducer';
import * as subsidiaryReducer from '@srcRoot/reducers/subsidiaryReducer';
import * as formDataReducer from '@srcRoot/reducers/formDataReducer';

export default combineReducers(
    Object.assign(
        filterReducer,
        dataReducer,
        productReducer,
        currencyReducer,
        baseCurrencyReducer,
        loaderReducer,
        userGuideReducer,
        promotionTypeReducer,
        dateRangeReducer,
        requestParamReducer,
        reportTitleReducer,
        subsidiaryReducer,
        formDataReducer
    )
);
