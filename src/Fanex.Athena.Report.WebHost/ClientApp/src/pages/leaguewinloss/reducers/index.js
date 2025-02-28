import { combineReducers } from 'redux';
import filterReducer from './filterReducer';
import dataReducer from './dataReducer';
import bettypeReducer from './bettypeReducer';
import sportReducer from './sportReducer';
import * as productReducer from '@/reducers/productReducer';
import * as currencyReducer from '@/reducers/currencyReducer';
import * as baseCurrencyReducer from '@/reducers/baseCurrencyReducer';
import * as statusReducer from '@/reducers/statusReducer';
import * as loaderReducer from '@/reducers/loaderReducer';
import * as userGuideReducer from '@/reducers/userGuideReducer';
import * as dateRangeReducer from '@/reducers/dateRangeReducer';
import * as requestParamReducer from '@/reducers/requestParamReducer';
import * as reportTitleReducer from '@/reducers/reportTitleReducer';
import * as usernameReducer from '@/reducers/usernameReducer';
import * as formDataReducer from '@/reducers/formDataReducer';

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
        formDataReducer,
    ),
);
