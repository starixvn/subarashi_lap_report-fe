import { combineReducers } from 'redux';
import * as gridDataReducer from '@srcRoot/reducers/gridDataReducer.js';
import * as productReducer from '@srcRoot/reducers/productReducer';
import * as currencyReducer from '@srcRoot/reducers/currencyReducer';
import * as baseCurrencyReducer from '@srcRoot/reducers/baseCurrencyReducer';
import * as statusReducer from '@srcRoot/reducers/statusReducer';
import * as liveStatusReducer from '@srcRoot/reducers/liveStatusReducer';
import * as loaderReducer from '@srcRoot/reducers/loaderReducer';
import * as dateRangeReducer from '@srcRoot/reducers/dateRangeReducer';
import * as requestParamReducer from '@srcRoot/reducers/requestParamReducer';
import * as reportTitleReducer from '@srcRoot/reducers/reportTitleReducer';
import * as sportReducer from './sportReducer';
import * as bettypeReducer from './bettypeReducer';
import * as usernameReducer from '@srcRoot/reducers/usernameReducer';
import * as convertAllReducer from '@srcRoot/reducers/convertAllReducer';
import * as userGuideReducer from '@srcRoot/reducers/userGuideReducer';
import * as subsidiaryReducer from '@srcRoot/reducers/subsidiaryReducer';
import * as platformReducer from '@srcRoot/reducers/platformReducer';
import * as formDataReducer from '@srcRoot/reducers/formDataReducer';
import * as customerClassReducer from '@srcRoot/reducers/customerClassReducer';
import * as filterReducer from './filterReducer';
import * as dataReducer from './dataReducer';
import * as appDataReducer from './appDataReducer';
import * as defaultStateReducer from './defaultStateReducer';

export default combineReducers(
    Object.assign(
        gridDataReducer,
        productReducer,
        currencyReducer,
        baseCurrencyReducer,
        statusReducer,
        liveStatusReducer,
        loaderReducer,
        dateRangeReducer,
        requestParamReducer,
        reportTitleReducer,
        sportReducer,
        bettypeReducer,
        usernameReducer,
        convertAllReducer,
        userGuideReducer,
        subsidiaryReducer,
        platformReducer,
        filterReducer,
        customerClassReducer,
        dataReducer,
        appDataReducer,
        formDataReducer,
        defaultStateReducer
    )
);
