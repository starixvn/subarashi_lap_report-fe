import { combineReducers } from 'redux';

import * as loaderReducer from '@srcRoot/reducers/loaderReducer';
import * as gridDataReducer from '@srcRoot/reducers/gridDataReducer';
import * as requestParamReducer from '@srcRoot/reducers/requestParamReducer';
import * as formDataReducer from '@srcRoot/reducers/formDataReducer';

export default combineReducers({ ...requestParamReducer, ...formDataReducer, ...loaderReducer, ...gridDataReducer });
