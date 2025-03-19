import { combineReducers } from 'redux';

import * as dateRangeReducer from '@/reducers/dateRangeReducer';
import * as loaderReducer from '@/reducers/loaderReducer';
import * as gridDataReducer from '@/reducers/gridDataReducer';
import * as userGuideReducer from '@/reducers/userGuideReducer';
import * as requestParamReducer from '@/reducers/requestParamReducer';

export default combineReducers(Object.assign(dateRangeReducer, loaderReducer, gridDataReducer, userGuideReducer, requestParamReducer));
