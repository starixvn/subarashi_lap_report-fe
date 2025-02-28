import { combineReducers } from 'redux';
import * as filterHandlerReducer from './filterHandlerReducer.js';
import * as productReducer from '@/reducers/productReducer';
import * as currencyReducer from '@/reducers/currencyReducer';
import * as baseCurrencyReducer from '@/reducers/baseCurrencyReducer';
import * as loaderReducer from '@/reducers/loaderReducer';
import * as excludeTestReducer from '@/reducers/excludeTestReducer';
import * as userGuideReducer from '@/reducers/userGuideReducer';
import * as formDataReducer from '@/reducers/formDataReducer';
import * as gridDataReducer from '@/reducers/gridDataReducer';
import * as requestParamReducer from '@/reducers/requestParamReducer';

export default combineReducers(
    Object.assign(
        filterHandlerReducer,
        productReducer,
        currencyReducer,
        baseCurrencyReducer,
        loaderReducer,
        excludeTestReducer,
        userGuideReducer,
        formDataReducer,
        gridDataReducer,
        requestParamReducer,
    ),
);
