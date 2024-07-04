import { combineReducers } from 'redux';
import * as filterHandlerReducer from './filterHandlerReducer.js';
import * as productReducer from '@srcRoot/reducers/productReducer';
import * as currencyReducer from '@srcRoot/reducers/currencyReducer';
import * as baseCurrencyReducer from '@srcRoot/reducers/baseCurrencyReducer';
import * as loaderReducer from '@srcRoot/reducers/loaderReducer';
import * as excludeTestReducer from '@srcRoot/reducers/excludeTestReducer';
import * as userGuideReducer from '@srcRoot/reducers/userGuideReducer';
import * as formDataReducer from '@srcRoot/reducers/formDataReducer';
import * as gridDataReducer from '@srcRoot/reducers/gridDataReducer';
import * as requestParamReducer from '@srcRoot/reducers/requestParamReducer';

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
        requestParamReducer
    )
);
