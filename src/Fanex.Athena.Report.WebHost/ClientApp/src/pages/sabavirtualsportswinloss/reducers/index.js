import { combineReducers } from 'redux';

import * as loaderReducer from '@srcRoot/reducers/loaderReducer';
import * as gridDataReducer from '@srcRoot/reducers/gridDataReducer';
import * as dateRangeReducer from '@srcRoot/reducers/dateRangeReducer';
import * as userGuideReducer from '@srcRoot/reducers/userGuideReducer';
import * as requestParamReducer from '@srcRoot/reducers/requestParamReducer';
import * as productReducer from '@srcRoot/reducers/productReducer';
import * as formDataReducer from '@srcRoot/reducers/formDataReducer';
import * as currencyReducer from '@srcRoot/reducers/currencyReducer';
import * as baseCurrencyReducer from '@srcRoot/reducers/baseCurrencyReducer';
import * as usernameReducer from '@srcRoot/reducers/usernameReducer';
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
        drillDownCacheReducer
    )
);
