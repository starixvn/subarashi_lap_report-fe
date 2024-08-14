import { combineReducers } from 'redux';

import * as loaderReducer from '@srcRoot/reducers/loaderReducer';
import * as gridDataReducer from '@srcRoot/reducers/gridDataReducer';
import * as dateRangeReducer from '@srcRoot/reducers/dateRangeReducer';
import * as userGuideReducer from '@srcRoot/reducers/userGuideReducer';
import * as requestParamReducer from '@srcRoot/reducers/requestParamReducer';
import * as formDataReducer from '@srcRoot/reducers/formDataReducer';
import * as currencyReducer from '@srcRoot/reducers/currencyReducer';
import * as excludeTestData from './excludeTestData';
import * as reportByReducer from './reportByReducer';
import * as drillDownCacheReducer from './drillDownCacheReducer';

export default combineReducers(
    Object.assign(
        loaderReducer,
        gridDataReducer,
        userGuideReducer,
        formDataReducer,
        requestParamReducer,
        currencyReducer,
        dateRangeReducer,
        excludeTestData,
        reportByReducer,
        drillDownCacheReducer
    )
);
