import { combineReducers } from 'redux';

import * as dateRangeReducer from '@/reducers/dateRangeReducer';
import * as loaderReducer from '@/reducers/loaderReducer';
import * as gridDataReducer from '@/reducers/gridDataReducer';
import * as userGuideReducer from '@/reducers/userGuideReducer';
import * as requestParamReducer from '@/reducers/requestParamReducer';
import * as productReducer from '@/reducers/productReducer';
import * as formDataReducer from '@/reducers/formDataReducer';

export default combineReducers(
    Object.assign(dateRangeReducer, productReducer, loaderReducer, gridDataReducer, userGuideReducer, formDataReducer, requestParamReducer),
);
