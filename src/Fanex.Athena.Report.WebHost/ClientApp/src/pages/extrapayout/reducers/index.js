import { combineReducers } from 'redux';
import filterReducer from './filterReducer';
import dataReducer from './dataReducer';
import promotionTypeReducer from './promotionTypeReducer';
import * as productReducer from '@/reducers/productReducer';
import * as currencyReducer from '@/reducers/currencyReducer';
import * as baseCurrencyReducer from '@/reducers/baseCurrencyReducer';
import * as loaderReducer from '@/reducers/loaderReducer';
import * as userGuideReducer from '@/reducers/userGuideReducer';
import * as dateRangeReducer from '@/reducers/dateRangeReducer';
import * as requestParamReducer from '@/reducers/requestParamReducer';
import * as reportTitleReducer from '@/reducers/reportTitleReducer';
import * as subsidiaryReducer from '@/reducers/subsidiaryReducer';
import * as formDataReducer from '@/reducers/formDataReducer';

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
        formDataReducer,
    ),
);
