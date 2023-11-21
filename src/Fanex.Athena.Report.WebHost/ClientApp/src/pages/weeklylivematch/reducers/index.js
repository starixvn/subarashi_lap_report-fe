import { combineReducers } from 'redux';

import * as dateRangeReducer from '@srcRoot/reducers/dateRangeReducer';
import * as loaderReducer from '@srcRoot/reducers/loaderReducer';
import * as gridDataReducer from '@srcRoot/reducers/gridDataReducer';
import * as userGuideReducer from '@srcRoot/reducers/userGuideReducer';

export default combineReducers(Object.assign(dateRangeReducer, loaderReducer, gridDataReducer, userGuideReducer));
