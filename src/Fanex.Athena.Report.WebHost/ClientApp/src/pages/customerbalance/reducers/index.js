import { combineReducers } from 'redux';

import * as dateRangeReducer from '@srcRoot/reducers/dateRangeReducer';
import * as loaderReducer from '@srcRoot/reducers/loaderReducer';
import * as gridDataReducer from '@srcRoot/reducers/gridDataReducer';
import * as userGuideReducer from '@srcRoot/reducers/userGuideReducer';
import * as requestParamReducer from '@srcRoot/reducers/requestParamReducer';
import * as productReducer from '@srcRoot/reducers/productReducer';
import * as formDataReducer from '@srcRoot/reducers/formDataReducer';

export default combineReducers(
    Object.assign(dateRangeReducer, productReducer, loaderReducer, gridDataReducer, userGuideReducer, formDataReducer, requestParamReducer)
);
