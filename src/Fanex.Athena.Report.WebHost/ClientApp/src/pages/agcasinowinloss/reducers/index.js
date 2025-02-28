import { combineReducers } from 'redux';

import * as loaderReducer from '@/reducers/loaderReducer';
import * as gridDataReducer from '@/reducers/gridDataReducer';
import * as dateRangeReducer from '@/reducers/dateRangeReducer';
import * as userGuideReducer from '@/reducers/userGuideReducer';
import * as requestParamReducer from '@/reducers/requestParamReducer';
import * as formDataReducer from '@/reducers/formDataReducer';
import * as currencyReducer from '@/reducers/currencyReducer';
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
        drillDownCacheReducer,
    ),
);
