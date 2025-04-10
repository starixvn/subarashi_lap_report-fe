import { combineReducers } from 'redux';
import * as gridDataReducer from '@/reducers/gridDataReducer.js';
import * as productReducer from '@/reducers/productReducer';
import * as currencyReducer from '@/reducers/currencyReducer';
import * as baseCurrencyReducer from '@/reducers/baseCurrencyReducer';
import * as statusReducer from '@/reducers/statusReducer';
import * as liveStatusReducer from '@/reducers/liveStatusReducer';
import * as loaderReducer from '@/reducers/loaderReducer';
import * as dateRangeReducer from '@/reducers/dateRangeReducer';
import * as requestParamReducer from '@/reducers/requestParamReducer';
import * as reportTitleReducer from '@/reducers/reportTitleReducer';
import * as sportReducer from './sportReducer';
import * as bettypeReducer from './bettypeReducer';
import * as usernameReducer from '@/reducers/usernameReducer';
import * as convertAllReducer from '@/reducers/convertAllReducer';
import * as userGuideReducer from '@/reducers/userGuideReducer';
import * as subsidiaryReducer from '@/reducers/subsidiaryReducer';
import * as platformReducer from '@/reducers/platformReducer';
import * as formDataReducer from '@/reducers/formDataReducer';
import * as customerClassReducer from '@/reducers/customerClassReducer';
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
