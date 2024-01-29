import { combineReducers } from 'redux';
import filterReducer from './filterReducer';
import dataReducer from './dataReducer';
import bettypeReducer from './bettypeReducer';
import sportReducer from './sportReducer';
import * as productReducer from '@srcRoot/reducers/productReducer';
import * as currencyReducer from '@srcRoot/reducers/currencyReducer';
import * as baseCurrencyReducer from '@srcRoot/reducers/baseCurrencyReducer';
import * as statusReducer from '@srcRoot/reducers/statusReducer';
import * as loaderReducer from '@srcRoot/reducers/loaderReducer';
import * as userGuideReducer from '@srcRoot/reducers/userGuideReducer';
import * as dateRangeReducer from '@srcRoot/reducers/dateRangeReducer';
import * as requestParamReducer from '@srcRoot/reducers/requestParamReducer';
import * as reportTitleReducer from '@srcRoot/reducers/reportTitleReducer';
import * as usernameReducer from '@srcRoot/reducers/usernameReducer';
import * as formDataReducer from '@srcRoot/reducers/formDataReducer';

export default combineReducers(
    Object.assign(
        filterReducer,
        dataReducer,
        productReducer,
        currencyReducer,
        baseCurrencyReducer,
        statusReducer,
        loaderReducer,
        userGuideReducer,
        bettypeReducer,
        sportReducer,
        dateRangeReducer,
        requestParamReducer,
        reportTitleReducer,
        usernameReducer,
        formDataReducer
    )
);
