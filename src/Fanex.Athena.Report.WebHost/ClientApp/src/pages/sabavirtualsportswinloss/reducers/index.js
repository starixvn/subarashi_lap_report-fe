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
import * as usernameReducer from '@/reducers/usernameReducer';
import * as gridSettingsReducer from './gridSettingsReducer';
import * as popupSettingsReducer from './popupSettingsReducer';
import * as drawFilterReducer from './drawFilterReducer';
import * as excludeTestData from './excludeTestData';
import * as leagueReducer from './leagueReducer';
import * as reportByReducer from './reportByReducer';
import * as sportReducer from './sportReducer';
import * as drillDownCacheReducer from './drillDownCacheReducer';

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
        gridSettingsReducer,
        popupSettingsReducer,
        dateRangeReducer,
        usernameReducer,
        drawFilterReducer,
        excludeTestData,
        leagueReducer,
        reportByReducer,
        sportReducer,
        drillDownCacheReducer,
    ),
);
